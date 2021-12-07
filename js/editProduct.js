import { baseUrl } from "./constants/api.js";
import { createMenu } from "./ui/createMenu.js";
import { getToken } from "./utils/userFunctions.js";
import displayMessage from "./components/displayMessage.js";
import { countItemsInCart } from "./utils/cartFunctions.js";

createMenu();
countItemsInCart();

const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const id = params.get("id");
const url = baseUrl + "products/" + id;

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
        // image.value = product.image;
        featured.value = product.featured;
        description.value = product.description;
        // id.value = product.id;

        console.log(product);
    }
    catch (error) {
        displayMessage("alert-error", "error", ".message-container");
        console.log(error);
    }
    finally {
        loader.style.display = "none";
        form.style.display = "block";
    }
})();

form.addEventListener("submit", submitForm)

function submitForm(event) {

    event.preventDefault()

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const featuredValue = featured.checked;
    const idValue = idInput.value;

    if (titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue < 20) {
        displayMessage("alert-warning", "Please supply all values", ".message-container");
    }

    updateProduct(titleValue, priceValue, descriptionValue, featuredValue);
}

async function updateProduct(title, price, description, featured) {
    const url = baseUrl + "products/" + id;

    const data = JSON.stringify({
        title: title,
        price: price,
        description: description,
        featured: featured
    });

    const token = getToken();

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer `
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        if (json.updated_at) {
            displayMessage("alert-success", "Product updated!", ".message-container");
        }

        if (json.error) {
            displayMessage("alert-danger", json.message, ".message-container");
        }
    }

    catch (error) {
        console.log(error);
    }
}
