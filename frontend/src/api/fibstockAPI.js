export function api (query) {
    return fetch("http://127.0.0.1:8000/api/companies?q=" + query);
}

export function getNewsForCompany(company) {
    let url = "http://127.0.0.1:8000/api/companies/" + company + "/news";
    return fetch(url);
}

