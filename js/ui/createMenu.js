import { getUsername } from "../utils/userFunctions.js";
// import { isUserLoggedIn } from "../utils/userFunctions.js";

export function createMenu() {

    const container = document.querySelector(".login-menu");
    const username = getUsername();

    let menu = `<a href="login.html">Login</a>`;

    if (username) {
        menu = `<div class="dropdown">
                    <button class="btn btn-sm dropdown-toggle text-decoration-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Hi ${username}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item small" href="add-products.html">Add products</a></li>
                        <li><a class="dropdown-item small" href="products.html">Edit products</a></li>
                        <li><a class="dropdown-item small" id="logout" href="#">Log out</a></li>
                    </ul>
                </div>`;
    }

    container.innerHTML = `${menu}`;
    // isUserLoggedIn();
}
