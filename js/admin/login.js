import displayMessage from "../components/displayMessage.js";
import { saveToken, saveUser } from "../utils/userFunctions.js";
import { createMenu } from "../ui/createMenu.js";
import { baseUrl } from "../constants/api.js";
import { countItemsInCart } from "../utils/cartFunctions.js";

createMenu();
countItemsInCart();

const form = document.querySelector("#login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const url = baseUrl + "admin/login";

form.addEventListener("submit", validateForm);

function validateForm(event) {
    event.preventDefault();

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (emailValue.length === 0 || passwordValue.length === 0) {
        return displayMessage("alert-danger", "Email and / or password invalid or don't match", ".message-container");
    }

    login(emailValue, passwordValue);
}

async function login(email, password) {

    const data = JSON.stringify({ "email": email, "password": password });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.data.user) {
            saveToken(json.data.token);
            saveUser(json.data.user);
            location.href = "admin.html";
        }

        if (json.error) {
            displayMessage("alert-danger", "Email and / or password invalid or don't match", ".message-container");
        }
    }
    catch (error) {
        displayMessage("alert-danger", "Email and / or password invalid or don't match", ".message-container");
    }

}
