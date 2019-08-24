from django.shortcuts import render
import pymongo
from django.http import JsonResponse, HttpResponse
import re

# Create your views here.
def index(request):
    return HttpResponse("placeholder")

def getCompanies(request):
    query = request.GET
    mongoClient = pymongo.MongoClient("mongodb://18.219.233.150:27017")
    fibstock = mongoClient["fibstock"]
    companies = []
    if ("q" not in query):
        for doc in fibstock.companies.find():
            doc["_id"] = str(doc["_id"])
            companies.append(doc)
        return JsonResponse(companies, safe=False)

    companyQuery = query["q"]
    ids = {}
    for doc in fibstock.companies.find({ "$text": { "$search": companyQuery } }):
        doc["_id"] = str(doc["_id"])
        ids[doc["_id"]] = 1
        companies.append(doc)

    for doc in fibstock.companies.find({ "name": {'$regex': companyQuery, '$options': 'i'} }):
        doc["_id"] = str(doc["_id"])
        if (doc["_id"] in ids):
            continue
        companies.append(doc)

    return JsonResponse(companies, safe=False)
    mongoClient.close()

def getNewsForCompany(request, *args, **kwargs):
    query = request.GET
    limit = int(query["limit"]) if "limit" in query else 10
    company = kwargs["company"]
    mongoClient = pymongo.MongoClient("mongodb://18.219.233.150:27017")
    fibstock = mongoClient["fibstock"]
    data = []
    for doc in fibstock.modeledNews.find({ "mentions": { "$elemMatch": { "$regex": company, "$options": "i" } }}).sort([("publishedAt", -1)]).limit(limit):
        doc["_id"] = str(doc["_id"])
        data.append(doc)
    return JsonResponse(data, safe=False)