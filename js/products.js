// import displayMessage from "./components/displayMessage";
import { getUsername } from "./utils/userFunctions.js";
import { baseUrl } from "./constants/api.js";
import { filterProducts } from "./utils/filterProducts.js";
import { createMenu } from "./ui/createMenu.js";
import { countItemsInCart } from "./utils/cartFunctions.js";

createMenu();
countItemsInCart();

const productsUrl = baseUrl + "products";
const container = ".products-container";

(async function getAllProducts() {

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();
        const products = json;
        createAllProducts(products, container);
        filterProducts(products, container);
    }
    catch (error) {
        // displayMessage("alert-danger", "An error occurred while trying to fetch the products", container);
        console.log(error);
    }
})();

function createAllProducts(data, targetElement) {
    const element = document.querySelector(targetElement);
    const username = getUsername();
    const title = document.querySelector("h1");

    element.innerHTML = "";

    if (data.length === 0) {
        displayMessage("alert-warning", "Sorry, we couldn't find any matching products", targetElement);
    }

    for (let i = 0; i < data.length; i++) {

        let authLink = `product.html`;

        if (username) {
            authLink = `edit-products.html`;
            title.innerHTML = "Select product to edit";
        }

        element.innerHTML += `<a href="${authLink}?id=${data[i].id}"
                                <div class="card">
                                    <img src="${data[i].image.url}" class="card-img-top" alt="${data[i].image.alternativeText}">
                                    <div class="card-body">
                                        <h3 class="card-title">${data[i].title}</h3>
                                        <p class="product-price mt-4"><span>$ ${data[i].price}</span></p>
                                    </div>
                                </div>
                            </a>`
    }
}
