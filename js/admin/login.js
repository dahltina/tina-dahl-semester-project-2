import displayMessage from "../components/displayMessage.js"

const form = document.querySelector("#login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", validateForm);

function validateForm(event) {
    event.preventDefault();

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if ( emailValue === 0 || passwordValue === 0 ) {
        return displayMessage("error", "Email and / or password invalid or don't match", ".message-container");
    }


}
