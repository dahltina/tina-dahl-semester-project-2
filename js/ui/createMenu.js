import { getUsername } from "../utils/userFunctions.js";
import { removeFromStorage } from "../utils/userFunctions.js";

export function createMenu() {

    const container = document.querySelector(".login-menu");
    const username = getUsername();

    let menu = `<a href="login.html">Login</a>`;

    if (username) {
        menu = `<div class="dropdown">
                    <button class="btn btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Hi ${username}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item small" href="admin.html">Edit products</a></li>
                        <li><a class="dropdown-item small" id="logout" href="#">Log out</a></li>
                    </ul>
                </div>`;


    }

    container.innerHTML = `${menu}`;
    // const logOutBtn = document.querySelector("#logout");
    // logOutBtn.addEventListener("click", logout);
}

function logout() {
    removeFromStorage("user");
    location.href = "index.html";
    console.log("logged out");
}
