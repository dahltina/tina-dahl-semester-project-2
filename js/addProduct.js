import { createMenu } from "./ui/createMenu.js";
import displayMessage from "./components/displayMessage.js"
import { getToken } from "./utils/userFunctions.js";
import { baseUrl } from "./constants/api.js";
import { countItemsInCart } from "./utils/cartFunctions.js";

createMenu();
countItemsInCart();

const form = document.querySelector("#add-products-form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const featured = document.querySelector("#featured");
const description = document.querySelector("#product-description");
const message = document.querySelector(".message-container");
const image = document.querySelector("#image-upload");
const token = getToken();
const url = baseUrl + "products";

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const featuredValue = featured.checked;

    if (titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue < 20) {
        displayMessage("alert-warning", "Please supply all values", ".message-container");
    }
    else {
        addProduct(titleValue, priceValue, descriptionValue, featuredValue);
    }
}


async function addProduct(title, price, description, featured) {
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
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        if (json.created_at) {
            displayMessage("alert-success", "Product added!", ".message-container");
            form.reset();
        }

        if (json.error) {
            displayMessage("alert-danger", json.message, ".message-container");
        }
    }
    catch (error) {
        displayMessage("alert-danger", "An error occurred", ".message-container");
    }
}
