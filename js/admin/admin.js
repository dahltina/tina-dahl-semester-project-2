import { createMenu } from "../ui/createMenu.js";
import { countItemsInCart } from "../utils/cartFunctions.js";
import { getUsername } from "../utils/userFunctions.js";

createMenu();
countItemsInCart();

// display username
const username = getUsername();
const displayUsername = document.querySelector(".username");
displayUsername.innerHTML = username;

// logout
const logoutBtn = document.querySelector("#logout");
logoutBtn.addEventListener("click", logout);

function logout() {
  localStorage.removeItem("user");
  location.href = "index.html";
}
