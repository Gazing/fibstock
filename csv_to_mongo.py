import csv
import json
import pandas as pd
import pymongo

import sys, getopt, pprint

#CSV to JSON Conversion
csvfile = open('./data/trainFake.csv', 'r')
reader = csv.DictReader( csvfile )
myclient = pymongo.MongoClient("18.219.233.150:27017")
database = myclient['fibstock']
collection = database['train']
header= ["title", "link", "publishedAt", "isFake"]

req = []

for each in reader:
    row={}
    for field in header:
        if field == "title":
            # Remove punctation
            each[field] = each[field].replace('[^\w\s]', ' ')
            # Remove numbers
            each[field] = each[field].replace('[^A-Za-z]', ' ')
            # Make sure any double-spaces are single
            each[field] = each[field].replace('  ', ' ')
            each[field] =  each[field].replace('  ', ' ')
            # Transform all text to lowercase
            each[field] = each[field].lower()
        row[field]=each[field]
    req.append(row)
collection.insert_many(req)
myclient.close()
