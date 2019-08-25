
export function api (query) {
    return fetch("http://127.0.0.1:8000/api/companies?q=" + query);
}

export function getNewsForCompany(company) {
    let url = "http://127.0.0.1:8000/api/companies/" + company + "/news";
    return fetch(url);
}

export function getSentimentAPI(news) {
    let url = "https://q1e83reyt3.execute-api.us-east-2.amazonaws.com/default?string=" + news;
    return fetch(url);
}