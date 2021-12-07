import { createMenu } from "../ui/createMenu.js";
import { getUsername } from "../utils/userFunctions.js";

createMenu();

// display username
const username = getUsername();
const displayTitle = document.querySelector(".username");
displayTitle.innerHTML = username;

// logout
const logoutBtn = document.querySelector("#logout");
logoutBtn.addEventListener("click", logout);

function logout() {
  localStorage.removeItem("user");
  location.href = "index.html";
}
