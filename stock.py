import requests
import csv
import simplejson as json

keyword = input("Please enter a company's name: ")

url = 'https://www.alphavantage.co/query'
keywordData = {
    "function": "SYMBOL_SEARCH",
    "keywords": keyword,
    "datatype": "json",
    "apikey": "T2BNSYRDVEE0BHYF"
    }

keywordRes = requests.get(url, params=keywordData).json()
dict = {}

for record in keywordRes['bestMatches']:
    dict[record['1. symbol']] = record['2. name']

if len(dict) > 1:
    print("Please choose a company code from following: ")
    for r in dict:
        print("code:" + r + '   ' + 'name: ' + dict[r])
    company = input("Enter your code here: ").upper()

companyData = {
    "function": "TIME_SERIES_MONTHLY_ADJUSTED",
    "symbol": company,
    "apikey": "T2BNSYRDVEE0BHYF"
}
companyRes =requests.get(url, params=companyData)

with open('stock.json', 'w') as stock:
    stock.writelines(companyRes.text)

stock.close()
