import { baseUrl } from "./constants/api.js";
import { createMenu } from "./ui/createMenu.js";
import displayMessage from "./components/displayMessage.js";

const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const id = params.get("id");
const url = baseUrl + "products/" + id;

createMenu();

// if (!id) {
//     document.location.href = "/";
// }

// need to add an admin products page first, that when you click
// a product you get sent to the edit form page

// or if there is some way to display the products page differently
// depending on if you are an admin logged in or not

// create a new createProducts.js for products page - for all products

// const userIsLoggedIn = getFromStorage("user");
// let pathname = `<a href="product.html?id=${data[i].id}"`;

// if (userIsLoggedIn) {
//     pathname = `<a href="product.html?id=${data[i].id}"`;
// }

const form = document.querySelector("#edit-products-form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const image = document.querySelector("#image-upload");
const featured = document.querySelector("#featured");
const description = document.querySelector("#product-description");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
const loader = document.querySelector(".loader");

(async function () {

    try {
        const response = await fetch(url);
        const product = await response.json();


        title.value = product.title;
        price.value = product.price;
        image.value = product.image;
        featured.value = product.featured;
        description.value = product.description;
        id.value = product.id;

        console.log(product);
    }
    catch (error) {
        displayMessage("alert-error", json.message, ".message-container");
        console.log(error);
    }
    finally {
        loader.style.display = "none";
        form.style.display = "block";
    }

})();
