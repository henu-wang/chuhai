#!/usr/bin/env python3
"""
SEC Form 13F Data Extractor

This script demonstrates how to extract Form 13F institutional holdings data
from the SEC's EDGAR APIs.

Usage:
    python form_13f_extractor.py

Author: Assistant
Date: 2025
"""

import requests
import json
import pandas as pd
import time
import xml.etree.ElementTree as ET
from datetime import datetime
import zipfile
import io
import re
from typing import List, Dict, Optional

class Form13FExtractor:
    """
    A class to extract and parse Form 13F data from SEC EDGAR APIs
    """
    
    def __init__(self, user_agent: str = "Research Tool research@example.com"):
        """
        Initialize the extractor with proper headers
        
        Args:
            user_agent: User-Agent string for SEC requests (required)
        """
        self.headers = {
            'User-Agent': user_agent,
            'Accept-Encoding': 'gzip, deflate',
            'Host': 'data.sec.gov'
        }
        self.base_url = "https://data.sec.gov"
        self.edgar_url = "https://www.sec.gov/Archives/edgar"
        
    def _rate_limit(self, delay: float = 0.1):
        """Apply rate limiting to stay within SEC guidelines"""
        time.sleep(delay)
    
    def get_company_info(self, cik: int) -> Dict:
        """
        Get basic company information by CIK
        
        Args:
            cik: Central Index Key (numeric)
            
        Returns:
            Dictionary containing company information
        """
        url = f"{self.base_url}/submissions/CIK{cik:010d}.json"
        
        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            data = response.json()
            
            return {
                'cik': data.get('cik'),
                'name': data.get('name'),
                'ticker': data.get('tickers', []),
                'exchanges': data.get('exchanges', []),
                'sic': data.get('sic'),
                'sicDescription': data.get('sicDescription'),
                'entityType': data.get('entityType')
            }
        except Exception as e:
            print(f"Error fetching company info for CIK {cik}: {e}")
            return {}
    
    def get_13f_filings(self, cik: int) -> List[Dict]:
        """
        Get all 13F filings for a specific CIK
        
        Args:
            cik: Central Index Key (numeric)
            
        Returns:
            List of 13F filing records
        """
        url = f"{self.base_url}/submissions/CIK{cik:010d}.json"
        
        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            data = response.json()
            
            filings = data['filings']['recent']
            form_13f_data = []
            
            for i, form_type in enumerate(filings['form']):
                if form_type in ['13F-HR', '13F-NT', '13F-HR/A', '13F-NT/A']:
                    form_13f_data.append({
                        'form': form_type,
                        'filingDate': filings['filingDate'][i],
                        'reportDate': filings['reportDate'][i],
                        'accessionNumber': filings['accessionNumber'][i],
                        'primaryDocument': filings['primaryDocument'][i],
                        'primaryDocDescription': filings['primaryDocDescription'][i],
                        'size': filings.get('size', [None] * len(filings['form']))[i]
                    })
            
            # Sort by filing date (most recent first)
            form_13f_data.sort(key=lambda x: x['filingDate'], reverse=True)
            
            return form_13f_data
            
        except Exception as e:
            print(f"Error fetching 13F filings for CIK {cik}: {e}")
            return []
    
    def get_13f_document_content(self, cik: int, accession_number: str) -> Optional[str]:
        """
        Get the raw content of a 13F document
        
        Args:
            cik: Central Index Key
            accession_number: SEC accession number
            
        Returns:
            Raw document content as string
        """
        # Clean accession number
        accession_clean = accession_number.replace('-', '')
        
        # Try different possible URLs for 13F data
        possible_urls = [
            f"{self.edgar_url}/data/{cik}/{accession_clean}/infotable.xml",
            f"{self.edgar_url}/data/{cik}/{accession_clean}/form13fInfoTable.xml",
            f"{self.edgar_url}/data/{cik}/{accession_clean}/{accession_number}.txt"
        ]
        
        for url in possible_urls:
            try:
                response = requests.get(url, headers=self.headers)
                if response.status_code == 200:
                    return response.text
                self._rate_limit()
            except Exception as e:
                print(f"Error fetching from {url}: {e}")
                continue
        
        return None
    
    def parse_13f_xml(self, xml_content: str) -> List[Dict]:
        """
        Parse 13F XML content to extract holdings
        
        Args:
            xml_content: Raw XML content
            
        Returns:
            List of holdings dictionaries
        """
        try:
            # Clean the XML content
            xml_content = re.sub(r'<\?xml.*?\?>', '', xml_content)
            xml_content = xml_content.strip()
            
            root = ET.fromstring(xml_content)
            holdings = []
            
            # Find all infoTable entries
            for info_table in root.findall('.//infoTable'):
                holding = {}
                
                # Extract security information
                name_elem = info_table.find('.//nameOfIssuer')
                if name_elem is not None and name_elem.text:
                    holding['issuer_name'] = name_elem.text.strip()
                
                title_elem = info_table.find('.//titleOfClass')
                if title_elem is not None and title_elem.text:
                    holding['title_of_class'] = title_elem.text.strip()
                
                cusip_elem = info_table.find('.//cusip')
                if cusip_elem is not None and cusip_elem.text:
                    holding['cusip'] = cusip_elem.text.strip()
                
                # Extract holding amounts
                value_elem = info_table.find('.//value')
                if value_elem is not None and value_elem.text:
                    holding['value'] = int(value_elem.text) * 1000  # Convert from thousands
                
                # Extract shares/principal amount
                shares_elem = info_table.find('.//shrsOrPrnAmt/sshPrnamt')
                if shares_elem is not None and shares_elem.text:
                    holding['shares'] = int(shares_elem.text)
                
                shares_type_elem = info_table.find('.//shrsOrPrnAmt/sshPrnamtType')
                if shares_type_elem is not None:
                    holding['shares_type'] = shares_type_elem.text
                
                # Extract put/call information
                put_call_elem = info_table.find('.//putCall')
                if put_call_elem is not None:
                    holding['put_call'] = put_call_elem.text
                
                # Extract investment discretion
                discretion_elem = info_table.find('.//investmentDiscretion')
                if discretion_elem is not None:
                    holding['investment_discretion'] = discretion_elem.text
                
                # Extract other manager info
                other_manager_elem = info_table.find('.//otherManager')
                if other_manager_elem is not None:
                    holding['other_manager'] = other_manager_elem.text
                
                # Extract voting authority
                voting_auth_sole = info_table.find('.//votingAuthority/Sole')
                if voting_auth_sole is not None:
                    holding['voting_sole'] = int(voting_auth_sole.text or 0)
                
                voting_auth_shared = info_table.find('.//votingAuthority/Shared')
                if voting_auth_shared is not None:
                    holding['voting_shared'] = int(voting_auth_shared.text or 0)
                
                voting_auth_none = info_table.find('.//votingAuthority/None')
                if voting_auth_none is not None:
                    holding['voting_none'] = int(voting_auth_none.text or 0)
                
                holdings.append(holding)
            
            return holdings
            
        except ET.ParseError as e:
            print(f"XML parsing error: {e}")
            return []
        except Exception as e:
            print(f"Error parsing 13F XML: {e}")
            return []
    
    def parse_13f_text(self, text_content: str) -> List[Dict]:
        """
        Parse 13F text format (fallback when XML not available)
        
        Args:
            text_content: Raw text content
            
        Returns:
            List of holdings dictionaries
        """
        holdings = []
        
        # Look for information table in text format
        # This is a simplified parser - actual implementation would be more complex
        lines = text_content.split('\n')
        
        in_info_table = False
        current_holding = {}
        
        for line in lines:
            line = line.strip()
            
            if 'INFORMATION TABLE' in line.upper():
                in_info_table = True
                continue
            
            if in_info_table and line:
                # Simple pattern matching for common fields
                if 'NAME OF ISSUER:' in line.upper():
                    current_holding['issuer_name'] = line.split(':', 1)[1].strip()
                elif 'CUSIP:' in line.upper():
                    current_holding['cusip'] = line.split(':', 1)[1].strip()
                elif 'VALUE:' in line.upper():
                    try:
                        value_str = line.split(':', 1)[1].strip().replace(',', '').replace('$', '')
                        current_holding['value'] = int(float(value_str) * 1000)
                    except:
                        pass
        
        if current_holding:
            holdings.append(current_holding)
        
        return holdings
    
    def get_13f_holdings(self, cik: int, accession_number: str) -> List[Dict]:
        """
        Get parsed holdings data for a specific 13F filing
        
        Args:
            cik: Central Index Key
            accession_number: SEC accession number
            
        Returns:
            List of holdings dictionaries
        """
        content = self.get_13f_document_content(cik, accession_number)
        if not content:
            return []
        
        # Try XML parsing first
        if '<' in content and '>' in content:
            holdings = self.parse_13f_xml(content)
            if holdings:
                return holdings
        
        # Fallback to text parsing
        return self.parse_13f_text(content)
    
    def analyze_holdings(self, holdings: List[Dict]) -> Dict:
        """
        Perform basic analysis on holdings data
        
        Args:
            holdings: List of holdings dictionaries
            
        Returns:
            Analysis results dictionary
        """
        if not holdings:
            return {}
        
        df = pd.DataFrame(holdings)
        
        analysis = {
            'total_holdings': len(holdings),
            'total_value': df['value'].sum() if 'value' in df.columns else 0,
            'total_positions': df['shares'].sum() if 'shares' in df.columns else 0,
        }
        
        if 'value' in df.columns:
            analysis['top_10_by_value'] = df.nlargest(10, 'value')[['issuer_name', 'value', 'shares']].to_dict('records')
            analysis['average_position_value'] = df['value'].mean()
            analysis['median_position_value'] = df['value'].median()
        
        return analysis

def demo_berkshire_hathaway():
    """
    Demonstration: Analyze Berkshire Hathaway's 13F holdings
    """
    extractor = Form13FExtractor()
    
    # Berkshire Hathaway CIK
    berkshire_cik = 1067983
    
    print("=== Berkshire Hathaway 13F Analysis ===\n")
    
    # Get company info
    print("Getting company information...")
    company_info = extractor.get_company_info(berkshire_cik)
    print(f"Company: {company_info.get('name')}")
    print(f"CIK: {company_info.get('cik')}")
    print(f"SIC: {company_info.get('sicDescription')}\n")
    
    # Get 13F filings
    print("Getting 13F filings...")
    filings = extractor.get_13f_filings(berkshire_cik)
    print(f"Found {len(filings)} 13F filings\n")
    
    if not filings:
        print("No 13F filings found.")
        return
    
    # Analyze the most recent filing
    latest_filing = filings[0]
    print(f"Latest 13F filing:")
    print(f"  Form: {latest_filing['form']}")
    print(f"  Filing Date: {latest_filing['filingDate']}")
    print(f"  Report Date: {latest_filing['reportDate']}")
    print(f"  Accession: {latest_filing['accessionNumber']}\n")
    
    # Get holdings data
    print("Retrieving holdings data...")
    holdings = extractor.get_13f_holdings(berkshire_cik, latest_filing['accessionNumber'])
    
    if holdings:
        print(f"Successfully parsed {len(holdings)} holdings\n")
        
        # Perform analysis
        analysis = extractor.analyze_holdings(holdings)
        
        print("=== Holdings Analysis ===")
        print(f"Total Holdings: {analysis['total_holdings']:,}")
        print(f"Total Value: ${analysis['total_value']:,.0f}")
        
        if 'top_10_by_value' in analysis:
            print("\nTop 10 Holdings by Value:")
            print("-" * 70)
            for i, holding in enumerate(analysis['top_10_by_value'], 1):
                name = holding.get('issuer_name', 'N/A')[:40]
                value = holding.get('value', 0)
                shares = holding.get('shares', 0)
                print(f"{i:2d}. {name:<40} ${value:>12,.0f} {shares:>10,.0f}")
        
        # Save to CSV for further analysis
        df = pd.DataFrame(holdings)
        filename = f"berkshire_13f_{latest_filing['reportDate']}.csv"
        df.to_csv(filename, index=False)
        print(f"\nHoldings data saved to: {filename}")
        
    else:
        print("Could not retrieve holdings data.")

def demo_multiple_institutions():
    """
    Demonstration: Compare holdings across multiple institutions
    """
    extractor = Form13FExtractor()
    
    # Notable institutional investors (CIKs)
    institutions = {
        'Berkshire Hathaway': 1067983,
        'BlackRock': 1364742,
        'Vanguard Group': 102909,
        'State Street Corp': 1137411,
        'JPMorgan Chase': 19617
    }
    
    print("=== Multi-Institution 13F Comparison ===\n")
    
    results = {}
    
    for name, cik in institutions.items():
        print(f"Analyzing {name}...")
        
        try:
            filings = extractor.get_13f_filings(cik)
            if filings:
                latest_filing = filings[0]
                holdings = extractor.get_13f_holdings(cik, latest_filing['accessionNumber'])
                
                if holdings:
                    analysis = extractor.analyze_holdings(holdings)
                    results[name] = {
                        'filing_date': latest_filing['filingDate'],
                        'total_holdings': analysis.get('total_holdings', 0),
                        'total_value': analysis.get('total_value', 0)
                    }
                    print(f"  ✓ Found {len(holdings)} holdings")
                else:
                    print(f"  ✗ No holdings data found")
            else:
                print(f"  ✗ No 13F filings found")
                
        except Exception as e:
            print(f"  ✗ Error: {e}")
        
        extractor._rate_limit(0.2)  # Rate limiting
    
    # Display comparison
    print("\n=== Comparison Results ===")
    print(f"{'Institution':<20} {'Filing Date':<12} {'Holdings':<10} {'Total Value':<15}")
    print("-" * 65)
    
    for name, data in results.items():
        filing_date = data['filing_date']
        holdings_count = data['total_holdings']
        total_value = data['total_value']
        print(f"{name:<20} {filing_date:<12} {holdings_count:<10,} ${total_value:<14,.0f}")

if __name__ == "__main__":
    print("SEC Form 13F Data Extractor")
    print("=" * 50)
    
    # Run demonstrations
    try:
        demo_berkshire_hathaway()
        print("\n" + "=" * 50 + "\n")
        demo_multiple_institutions()
        
    except KeyboardInterrupt:
        print("\nOperation cancelled by user.")
    except Exception as e:
        print(f"Error: {e}")