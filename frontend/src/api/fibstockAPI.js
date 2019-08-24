export function api (company) {
    return fetch("http://127.0.0.1:8000/api/companies/" + company + "/news");
}


