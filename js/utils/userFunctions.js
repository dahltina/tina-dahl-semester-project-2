
const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
    saveToStorage(tokenKey, token);
}

export function getToken() {
    return getFromStorage(tokenKey);
}

export function saveUser(user) {
    saveToStorage(userKey, user);
}

export function getUsername() {
    const user = getFromStorage(userKey);

    if (user) {
        return user.username;
    }
    return null;
}

export function removeFromStorage(user) {
    localStorage.removeItem(user);
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key) {
    const value = localStorage.getItem(key);

    if(!value) {
        return [];
    }
    else {
        return JSON.parse(value);
    }
}



// export function isUserLoggedIn () {

//     const userIsLoggedIn = getUsername();
//     console.log(userIsLoggedIn);

//     if (userIsLoggedIn) {
//         let logoutBtn = document.querySelector("#logout");
//         logoutBtn.addEventListener("click", logout());
//         console.log("logged out");
//     }
// }

// function logout() {
//     localStorage.removeItem("user");
// }
