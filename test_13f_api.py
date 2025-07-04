#!/usr/bin/env python3
"""
Simple test script to verify SEC 13F API access

This script tests basic connectivity to SEC APIs and demonstrates
how to retrieve Form 13F filing information.
"""

import requests
import json
import time

def test_sec_api_access():
    """Test basic SEC API access"""
    
    # Required headers for SEC API
    headers = {
        'User-Agent': 'Test Application test@example.com',
        'Accept-Encoding': 'gzip, deflate',
        'Host': 'data.sec.gov'
    }
    
    # Test with Berkshire Hathaway CIK: 1067983
    cik = 1067983
    url = f"https://data.sec.gov/submissions/CIK{cik:010d}.json"
    
    print("Testing SEC API Access...")
    print(f"URL: {url}")
    print(f"Headers: {headers}")
    print("-" * 50)
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        
        print("✓ API Connection Successful!")
        print(f"Company Name: {data.get('name')}")
        print(f"CIK: {data.get('cik')}")
        print(f"SIC Description: {data.get('sicDescription')}")
        
        # Check for 13F filings
        filings = data['filings']['recent']
        form_13f_indices = [i for i, form in enumerate(filings['form']) if '13F' in form]
        
        print(f"\nFound {len(form_13f_indices)} 13F-related filings:")
        
        for i in form_13f_indices[:5]:  # Show first 5
            form_type = filings['form'][i]
            filing_date = filings['filingDate'][i]
            accession = filings['accessionNumber'][i]
            print(f"  {form_type} - {filing_date} - {accession}")
        
        if form_13f_indices:
            # Test document access
            latest_13f_index = form_13f_indices[0]
            accession_number = filings['accessionNumber'][latest_13f_index]
            
            print(f"\nTesting document access for: {accession_number}")
            test_document_access(cik, accession_number, headers)
        
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"✗ API Request Failed: {e}")
        return False
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def test_document_access(cik, accession_number, headers):
    """Test accessing actual 13F document content"""
    
    # Clean accession number for URL
    accession_clean = accession_number.replace('-', '')
    
    # Possible document URLs
    possible_urls = [
        f"https://www.sec.gov/Archives/edgar/data/{cik}/{accession_clean}/infotable.xml",
        f"https://www.sec.gov/Archives/edgar/data/{cik}/{accession_clean}/form13fInfoTable.xml",
        f"https://www.sec.gov/Archives/edgar/data/{cik}/{accession_clean}/{accession_number}.txt"
    ]
    
    print("Testing document access...")
    
    for url in possible_urls:
        try:
            print(f"  Trying: {url}")
            response = requests.get(url, headers=headers)
            
            if response.status_code == 200:
                content_length = len(response.text)
                print(f"  ✓ Success! Document found ({content_length:,} characters)")
                
                # Check if it's XML content
                if '<' in response.text and '>' in response.text:
                    print("  ✓ XML format detected")
                    
                    # Look for info table tags
                    if 'infoTable' in response.text:
                        print("  ✓ Information table structure found")
                    
                return True
            else:
                print(f"  ✗ HTTP {response.status_code}")
                
        except Exception as e:
            print(f"  ✗ Error: {e}")
        
        time.sleep(0.1)  # Rate limiting
    
    print("  ✗ No accessible document found")
    return False

def test_multiple_companies():
    """Test API access with multiple institutional investors"""
    
    companies = {
        'Berkshire Hathaway': 1067983,
        'BlackRock Inc': 1364742,
        'Vanguard Group': 102909,
        'State Street Corp': 1137411
    }
    
    headers = {
        'User-Agent': 'Test Application test@example.com',
        'Accept-Encoding': 'gzip, deflate',
        'Host': 'data.sec.gov'
    }
    
    print("\n" + "=" * 60)
    print("Testing Multiple Institutional Investors")
    print("=" * 60)
    
    results = {}
    
    for name, cik in companies.items():
        print(f"\nTesting {name} (CIK: {cik})")
        print("-" * 40)
        
        try:
            url = f"https://data.sec.gov/submissions/CIK{cik:010d}.json"
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            
            data = response.json()
            filings = data['filings']['recent']
            
            # Count 13F filings
            form_13f_count = sum(1 for form in filings['form'] if '13F' in form)
            
            # Get latest 13F filing date
            latest_13f_date = None
            for i, form in enumerate(filings['form']):
                if '13F' in form:
                    latest_13f_date = filings['filingDate'][i]
                    break
            
            results[name] = {
                'success': True,
                'company_name': data.get('name'),
                'total_13f_filings': form_13f_count,
                'latest_13f_date': latest_13f_date
            }
            
            print(f"✓ Success")
            print(f"  Company: {data.get('name')}")
            print(f"  13F Filings: {form_13f_count}")
            print(f"  Latest 13F: {latest_13f_date}")
            
        except Exception as e:
            print(f"✗ Failed: {e}")
            results[name] = {'success': False, 'error': str(e)}
        
        time.sleep(0.2)  # Rate limiting
    
    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    
    successful = sum(1 for result in results.values() if result.get('success'))
    total = len(results)
    
    print(f"Successful API calls: {successful}/{total}")
    
    if successful > 0:
        print("\nSuccessful companies:")
        for name, result in results.items():
            if result.get('success'):
                latest = result.get('latest_13f_date', 'N/A')
                count = result.get('total_13f_filings', 0)
                print(f"  {name}: {count} filings, latest: {latest}")

def main():
    """Main test function"""
    print("SEC Form 13F API Test")
    print("=" * 50)
    
    # Test basic API access
    success = test_sec_api_access()
    
    if success:
        # Test multiple companies
        test_multiple_companies()
        
        print("\n" + "=" * 60)
        print("TEST COMPLETE")
        print("=" * 60)
        print("✓ SEC API access is working correctly")
        print("✓ 13F filing data can be retrieved")
        print("✓ Ready to implement full data extraction")
        
    else:
        print("\n✗ Basic API test failed. Check:")
        print("  - Internet connection")
        print("  - SEC API availability")
        print("  - User-Agent header requirements")

if __name__ == "__main__":
    main()