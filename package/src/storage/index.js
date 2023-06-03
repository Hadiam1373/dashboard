// get data from localstorage
export function getItem(key) {
    return localStorage.getItem(key)
}

//set data in localstorage
export function setItem(key, value) {
    return localStorage.setItem(key, value)
}

//remove item in localstorage
export function removeItem(key) {
    return localStorage.removeItem(key);
}

//clear localstorage
export function clearItem() {
    return localStorage.clear();
}
