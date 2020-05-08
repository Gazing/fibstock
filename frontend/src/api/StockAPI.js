
export function getStockWithCode(code) {
    let url = 'https://api.unibit.ai/api/historicalstockprice/' + code;
    let params = {
        "range": "3m",
        "interval": 7,
        "AccessKey": "mjJsN7YUDjvSS4HOJACS20mYIFU7ECzE&fbclid=IwAR2aQx9EHb39AjPQXEzxV5pCaAMwVn7AJgczaB315HBWEwUB4aUcxQp4wt4"
    };

    return fetch(url + "?" + paramsToQueryString(params))


}

function paramsToQueryString(params) {
    return Object.keys(params).map((key) => { return key + "=" + params[key] }).join("&");
}

export function getFakeNewsForCompany(company) {
    // let url = 'http://18.188.57.31/api/companies/'+company+'/news';
    let url = "http://127.0.0.1:8000/api/companies/" + company + "/news";
    let params = {
        isFake: true,
        limit: 99999
    };

    return fetch(url + "?" + paramsToQueryString(params));
}