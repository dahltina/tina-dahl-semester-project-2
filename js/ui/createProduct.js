import { baseUrl } from "../constants/api.js";
import { addToCart } from "../utils/cartFunctions.js";
import { createMenu } from "./createMenu.js";
import { countItemsInCart } from "../utils/cartFunctions.js";
import displayMessage from "../components/displayMessage.js";

createMenu();
countItemsInCart();

const productContainer = document.querySelector(".product-container");
const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const id = params.get("id");
const breadcrumbActive = document.querySelector(".breadcrumb-active");
const pageTitle = document.querySelector("title");
const url = baseUrl + "products/" + id;


async function createProduct() {

    try {
        const response = await fetch(url);
        const product = await response.json();

        productContainer.innerHTML = "";

        productContainer.innerHTML += ` <div class="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-lg-between align-items-center mx-auto product">
                                            <div class="order-2 order-md-1 product-info">
                                                <h1>${product.title}</h1>
                                                <p class="mt-4">${product.description}</p>
                                                <p class="product-price mt-4"><span>$ ${product.price}</span></p>
                                                <button data-id="${product.id}"
                                                    data-name="${product.title}"
                                                    data-price="${product.price}"
                                                    data-image="${product.image.formats.thumbnail.url}"
                                                    class="btn btn-outline-primary add-to-cart-btn mt-4">
                                                        Add to cart
                                                </button>
                                            </div>
                                            <div class="order-1 order-md-2 my-4 product-image">
                                                <img src="${product.image.url}" class="product-image" alt="${product.image.alternativeText}">
                                            </div>
                                        </div>`;

        pageTitle.innerHTML += `${product.title}`;
        breadcrumbActive.innerHTML += `${product.title}`;

    }

    catch (error) {
        displayMessage("alert-danger", "An error occurred while trying to fetch products", productContainer)
    }
}

// Add to cart
createProduct().then(() => {
    const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");

    addToCartBtn.forEach((button) => {
        button.addEventListener("click", addToCart)
    });
})


// display "you may also like"
async function getMoreProducts() {

    const productsUrl = baseUrl + "products/";

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();
        console.log(json);
        displayProducts(json);
    }
    catch (error) {
        console.log(error);
    }
}

getMoreProducts();

function displayProducts(data) {

    const container = document.querySelector(".more-products-container");

    container.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        if (i === 4) {
            break;
        }

        container.innerHTML += `<a href="product.html?id=${data[i].id}"
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

