import { baseUrl } from "../constants/api.js";

const productContainer = document.querySelector(".product-container");
const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const id = params.get("id");
// const breadcrumb1 = document.querySelector(".breadcrumb1");
const breadcrumbActive = document.querySelector(".breadcrumb-active");
const pageTitle = document.querySelector("title");
const prevPage = document.referrer;

console.log(prevPage);


const url = baseUrl + "products/" + id;

async function createProduct() {

    try {
        const response = await fetch(url);
        const product = await response.json();
        console.log(product);

        productContainer.innerHTML = "";

        productContainer.innerHTML += ` <div class="product d-flex">
                                            <div class="product-info">
                                                <h1>${product.title}</h1>
                                                <p>${product.description}</p>
                                                <p>${product.price}</p>
                                                <button class="btn btn-outline-primary add-to-cart-btn">Add to cart</button>
                                            </div>
                                            <div class="product-image">
                                                <img src="${product.image.url}" class="" alt="${product.image.alternativeText}">
                                            </div>
                                        </div>`;

        pageTitle.innerHTML += `${product.title}`;
        breadcrumbActive.innerHTML += `${product.title}`;

    }

    catch(error) {
        console.log(error);
    }
}

createProduct()

// THEN

// const addToCartBtn = document.querySelector(".add-to-cart-btn");

// addToCartBtn.addEventListener("click");
// console.log("click");
