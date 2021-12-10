import { baseUrl } from "./constants/api.js";
import { createMenu } from "./ui/createMenu.js";
import { getToken } from "./utils/userFunctions.js";
import displayMessage from "./components/displayMessage.js";
import { countItemsInCart } from "./utils/cartFunctions.js";
import { deleteProduct } from "./admin/deleteProduct.js";

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

// get the product
(async function () {

    try {
        const response = await fetch(url);
        const product = await response.json();

        title.value = product.title;
        price.value = product.price;
        featured.checked = product.featured;
        description.value = product.description;
        deleteProduct(product.id);

        console.log(product);
    }
    catch (error) {
        displayMessage("alert-danger", "An error occurred while trying to fetch the product", ".message-container");
    }
    finally {
        loader.style.display = "none";
        form.style.display = "block";
    }
})();

// validate form
form.addEventListener("submit", submitForm)

function submitForm(event) {

    event.preventDefault()

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const featuredValue = featured.checked;

    if (titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue < 20) {
        displayMessage("alert-warning", "Please supply all values", ".message-container");
    }

    updateProduct(titleValue, priceValue, descriptionValue, featuredValue);
}

// update product
async function updateProduct(title, price, description, featured) {

    const token = getToken();
    const formData = new FormData();

    if (image.files.length === 0) {
        displayMessage("alert-warning", "Select an image", ".message-container");
    }
    const file = image.files[0];

    const data = {
        title: title,
        price: price,
        description: description,
        featured: featured
    };

    formData.append("files.image", file, file.name);
    formData.append("data", JSON.stringify(data));

    const options = {
        method: "PUT",
        body: formData,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        if (json.updated_at) {
            displayMessage("alert-success", `Product updated! <a href="product.html?id=${id}">Check it out</a>`, ".message-container");
        }

        if (json.error) {
            displayMessage("alert-danger", json.message, ".message-container");
        }
    }

    catch (error) {
        console.log(error);
    }
}
