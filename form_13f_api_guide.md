# SEC Form 13F Data Access Guide

## Overview

Form 13F is filed quarterly by institutional investment managers who exercise investment discretion over $100 million or more in equity securities. This guide shows how to access 13F data through the SEC's EDGAR APIs.

## Key Data Sources

### 1. SEC Submissions API (data.sec.gov)
Access individual company filings through the submissions endpoint:
```
https://data.sec.gov/submissions/CIK##########.json
```

### 2. Bulk 13F Data Sets
Quarterly ZIP files containing structured 13F data:
```
https://www.sec.gov/Archives/edgar/daily-index/xbrl/companyfacts.zip
https://www.sec.gov/Archives/edgar/daily-index/bulkdata/submissions.zip
```

### 3. Historical 13F Quarterly Data
Direct access to quarterly 13F data sets:
```
https://catalog.data.gov/dataset/form-13f-data-sets
```

## API Endpoints for 13F Data

### 1. Company Submissions API
Get all filings for a specific institutional manager:

**URL Format:**
```
https://data.sec.gov/submissions/CIK{10-digit-CIK}.json
```

**Example:**
```python
import requests
import json

# Example: Berkshire Hathaway (CIK: 0001067983)
cik = "0001067983"
url = f"https://data.sec.gov/submissions/CIK{cik}.json"

headers = {
    'User-Agent': 'Your Company Name your-email@company.com'
}

response = requests.get(url, headers=headers)
data = response.json()

# Filter for 13F filings
filings = data['filings']['recent']
form_13f_indices = [i for i, form in enumerate(filings['form']) if form == '13F-HR']

print(f"Found {len(form_13f_indices)} 13F filings")
for i in form_13f_indices[:5]:  # Show first 5
    print(f"Date: {filings['filingDate'][i]}, Accession: {filings['accessionNumber'][i]}")
```

### 2. Document Retrieval
Access specific 13F documents using accession numbers:

```python
def get_13f_document(cik, accession_number):
    """
    Retrieve 13F document content
    """
    # Remove dashes from accession number for URL
    accession_clean = accession_number.replace('-', '')
    
    # Construct document URL
    doc_url = f"https://www.sec.gov/Archives/edgar/data/{int(cik)}/{accession_clean}/{accession_number}.txt"
    
    headers = {
        'User-Agent': 'Your Company Name your-email@company.com'
    }
    
    response = requests.get(doc_url, headers=headers)
    return response.text

# Example usage
cik = "0001067983"
accession = "0001067983-24-000074"  # Example accession number
document_content = get_13f_document(cik, accession)
```

## Complete Python Example

```python
import requests
import json
import pandas as pd
from time import sleep
import xml.etree.ElementTree as ET

class Form13FExtractor:
    def __init__(self, user_agent="Your Company Name your-email@company.com"):
        self.headers = {'User-Agent': user_agent}
        self.base_url = "https://data.sec.gov"
    
    def get_company_filings(self, cik):
        """Get all filings for a company by CIK"""
        url = f"{self.base_url}/submissions/CIK{cik:010d}.json"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()
    
    def get_13f_filings(self, cik):
        """Get only 13F filings for a company"""
        data = self.get_company_filings(cik)
        filings = data['filings']['recent']
        
        form_13f_data = []
        for i, form_type in enumerate(filings['form']):
            if form_type in ['13F-HR', '13F-NT']:
                form_13f_data.append({
                    'form': form_type,
                    'filingDate': filings['filingDate'][i],
                    'reportDate': filings['reportDate'][i],
                    'accessionNumber': filings['accessionNumber'][i],
                    'primaryDocument': filings['primaryDocument'][i],
                    'primaryDocDescription': filings['primaryDocDescription'][i]
                })
        
        return form_13f_data
    
    def get_13f_xml_data(self, cik, accession_number):
        """Get 13F XML data from EDGAR"""
        # Clean accession number
        accession_clean = accession_number.replace('-', '')
        
        # Try to find the information table XML file
        # Format: https://www.sec.gov/Archives/edgar/data/{cik}/{accession_clean}/infotable.xml
        xml_url = f"https://www.sec.gov/Archives/edgar/data/{int(cik)}/{accession_clean}/infotable.xml"
        
        try:
            response = requests.get(xml_url, headers=self.headers)
            response.raise_for_status()
            return response.text
        except requests.exceptions.RequestException:
            # If infotable.xml doesn't exist, try the primary document
            doc_url = f"https://www.sec.gov/Archives/edgar/data/{int(cik)}/{accession_clean}/{accession_number}.txt"
            response = requests.get(doc_url, headers=self.headers)
            response.raise_for_status()
            return response.text
    
    def parse_13f_holdings(self, xml_content):
        """Parse 13F XML content to extract holdings data"""
        try:
            root = ET.fromstring(xml_content)
            holdings = []
            
            # Find all infoTable entries
            for info_table in root.findall('.//infoTable'):
                holding = {}
                
                # Extract security name and details
                name_of_issuer = info_table.find('.//nameOfIssuer')
                if name_of_issuer is not None:
                    holding['issuer_name'] = name_of_issuer.text
                
                title_of_class = info_table.find('.//titleOfClass')
                if title_of_class is not None:
                    holding['title_of_class'] = title_of_class.text
                
                cusip = info_table.find('.//cusip')
                if cusip is not None:
                    holding['cusip'] = cusip.text
                
                # Extract holding details
                value = info_table.find('.//value')
                if value is not None:
                    holding['value'] = int(value.text) * 1000  # Value is in thousands
                
                shares_or_principal = info_table.find('.//shrsOrPrnAmt')
                if shares_or_principal is not None:
                    shs_or_prn_amt = shares_or_principal.find('.//sshPrnamt')
                    if shs_or_prn_amt is not None:
                        holding['shares'] = int(shs_or_prn_amt.text)
                
                # Investment discretion
                investment_discretion = info_table.find('.//investmentDiscretion')
                if investment_discretion is not None:
                    holding['investment_discretion'] = investment_discretion.text
                
                holdings.append(holding)
            
            return holdings
        except ET.ParseError:
            print("Error parsing XML content")
            return []

# Example usage
def main():
    extractor = Form13FExtractor()
    
    # Example: Get Berkshire Hathaway's 13F filings
    berkshire_cik = 1067983
    
    print("Getting 13F filings for Berkshire Hathaway...")
    filings = extractor.get_13f_filings(berkshire_cik)
    
    print(f"Found {len(filings)} 13F filings")
    
    # Get the most recent 13F filing
    if filings:
        latest_filing = filings[0]
        print(f"\nLatest filing: {latest_filing['filingDate']}")
        print(f"Accession Number: {latest_filing['accessionNumber']}")
        
        # Get the holdings data
        print("\nRetrieving holdings data...")
        xml_data = extractor.get_13f_xml_data(berkshire_cik, latest_filing['accessionNumber'])
        holdings = extractor.parse_13f_holdings(xml_data)
        
        if holdings:
            # Convert to DataFrame for analysis
            df = pd.DataFrame(holdings)
            print(f"\nFound {len(df)} holdings")
            print("\nTop 10 holdings by value:")
            print(df.nlargest(10, 'value')[['issuer_name', 'value', 'shares']])
        else:
            print("No holdings data found - may need to parse text format")

if __name__ == "__main__":
    main()
```

## Bulk Data Access

For large-scale analysis, use the quarterly bulk data files:

```python
import requests
import zipfile
import io

def download_13f_bulk_data(quarter, year):
    """
    Download quarterly 13F bulk data
    Example: download_13f_bulk_data('q1', '2024')
    """
    url = f"https://www.sec.gov/files/structureddata/data/form-13f-data-sets/{year}{quarter}_form13f.zip"
    
    headers = {
        'User-Agent': 'Your Company Name your-email@company.com'
    }
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    
    # Extract ZIP file
    with zipfile.ZipFile(io.BytesIO(response.content)) as zip_file:
        zip_file.extractall('13f_data')
    
    print(f"Downloaded and extracted {year} {quarter} 13F data")

# Download latest quarter data
download_13f_bulk_data('q3', '2024')
```

## Rate Limiting and Best Practices

1. **Rate Limiting**: SEC requires no more than 10 requests per second
2. **User-Agent**: Always include a descriptive User-Agent header
3. **Respect robots.txt**: Follow SEC's robots.txt guidelines
4. **Error Handling**: Implement proper error handling and retries

```python
import time
from functools import wraps

def rate_limit(calls_per_second=10):
    """Decorator to enforce rate limiting"""
    def decorator(func):
        last_called = [0.0]
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            elapsed = time.time() - last_called[0]
            left_to_wait = 1.0 / calls_per_second - elapsed
            if left_to_wait > 0:
                time.sleep(left_to_wait)
            ret = func(*args, **kwargs)
            last_called[0] = time.time()
            return ret
        return wrapper
    return decorator

# Apply rate limiting to requests
@rate_limit(calls_per_second=10)
def make_sec_request(url, headers):
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response
```

## Data Analysis Examples

### 1. Track Holdings Changes Over Time

```python
def track_holdings_changes(cik, symbol):
    """Track changes in holdings for a specific stock symbol"""
    extractor = Form13FExtractor()
    filings = extractor.get_13f_filings(cik)
    
    holdings_history = []
    
    for filing in filings[:4]:  # Last 4 quarters
        xml_data = extractor.get_13f_xml_data(cik, filing['accessionNumber'])
        holdings = extractor.parse_13f_holdings(xml_data)
        
        # Find holdings for specific symbol
        for holding in holdings:
            if symbol.lower() in holding.get('issuer_name', '').lower():
                holdings_history.append({
                    'date': filing['filingDate'],
                    'shares': holding.get('shares', 0),
                    'value': holding.get('value', 0)
                })
                break
        
        time.sleep(0.1)  # Rate limiting
    
    return holdings_history

# Example: Track Berkshire's Apple holdings
apple_holdings = track_holdings_changes(1067983, 'Apple')
for holding in apple_holdings:
    print(f"Date: {holding['date']}, Shares: {holding['shares']:,}, Value: ${holding['value']:,}")
```

### 2. Find Top Institutional Holders

```python
def find_top_holders(cusip, quarter='2024q3'):
    """Find top institutional holders for a specific CUSIP"""
    # This would require processing the bulk 13F data
    # Download and parse the quarterly ZIP file
    pass
```

## Important Notes

1. **13F Filing Schedule**: Filed within 45 days after quarter-end
2. **Threshold**: Only managers with $100M+ in qualifying securities
3. **Data Lag**: Data is not real-time, updated quarterly
4. **Coverage**: Only covers certain equity securities, not all positions

## Resources

- [SEC 13F Data Sets](https://www.sec.gov/data-research/sec-markets-data/form-13f-data-sets)
- [EDGAR Developer Resources](https://www.sec.gov/developer)
- [13F Filing Instructions](https://www.sec.gov/about/forms/form13f.pdf)