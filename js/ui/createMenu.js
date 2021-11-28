import { getUsername } from "../utils/userFunctions.js";
import { removeFromStorage } from "../utils/userFunctions.js";

export function createMenu() {

    const container = document.querySelector(".login-menu");
    const username = getUsername();

    let menu = `<a href="login.html">Login</a>`;

    if (username) {
        menu = `<div class="btn-group">
                    <button type="button" class="btn btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Hi ${username}
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="admin.html">Edit products</a>
                        <a class="dropdown-item" id="logout" href="#">Log out</a>
                    </div>
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
