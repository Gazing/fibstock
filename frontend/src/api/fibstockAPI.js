<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 4efc93af05f17a38f8758f1cc683ee83c81da756
export function api (query) {
    return fetch("http://127.0.0.1:8000/api/companies?q=" + query);
}

export function getNewsForCompany(company) {
    let url = "http://127.0.0.1:8000/api/companies/" + company + "/news";
    return fetch(url);
}
<<<<<<< HEAD
=======
=======
export function api (company) {
    return fetch("http://127.0.0.1:8000/api/companies/" + company + "/news");
}

>>>>>>> 24d2f8114f9e11940fd209d6a3c0464da30a52fe
>>>>>>> 4efc93af05f17a38f8758f1cc683ee83c81da756

