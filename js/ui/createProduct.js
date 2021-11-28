import { baseUrl } from "../constants/api.js";
import { addToCart } from "../utils/cartFunctions.js";
import { createMenu } from "./createMenu.js";

const productContainer = document.querySelector(".product-container");
const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const id = params.get("id");
const breadcrumbActive = document.querySelector(".breadcrumb-active");
const pageTitle = document.querySelector("title");

// const breadcrumb1 = document.querySelector(".breadcrumb1");
// const prevPage = document.referrer;
// console.log(prevPage);

createMenu();


const url = baseUrl + "products/" + id;

async function createProduct() {

    try {
        const response = await fetch(url);
        const product = await response.json();

        productContainer.innerHTML = "";

        productContainer.innerHTML += ` <div class="product d-flex">
                                            <div class="product-info mx-5">
                                                <h1>${product.title}</h1>
                                                <p>${product.description}</p>
                                                <p>${product.price}</p>
                                                <button data-id="${product.id}"
                                                    data-name="${product.title}"
                                                    data-price="${product.price}"
                                                    data-image="${product.image.formats.thumbnail.url}"
                                                    class="btn btn-outline-primary add-to-cart-btn">
                                                        Add to cart
                                                </button>
                                            </div>
                                            <div class="product-image">
                                                <img src="${product.image.url}" class="product-image" alt="${product.image.alternativeText}">
                                            </div>
                                        </div>`;

        pageTitle.innerHTML += `${product.title}`;
        breadcrumbActive.innerHTML += `${product.title}`;

    }

    catch(error) {
        console.log(error);
    }
}

// Add to cart
createProduct().then(() => {
    const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");

    addToCartBtn.forEach((button) => {
      button.addEventListener("click", addToCart)
    });
})
