import { baseUrl } from "./constants/api.js";
import { createCards } from "./ui/createCards.js";
import { createArticles } from "./ui/createArticles.js";
import { createMenu } from "./ui/createMenu.js";
import { countItemsInCart } from "./utils/cartFunctions.js";
import { filterProducts } from "./utils/filterProducts.js";
import displayMessage from "./components/displayMessage.js";

const productsUrl = baseUrl + "products";
const container = ".featured-products-container";

createMenu();
countItemsInCart();


(async function getProducts() {

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();
        const products = json;
        createCards(products, container);
        filterProducts(products, container);

    }
    catch (error) {
        displayMessage("alert-danger", "An error occurred while trying to fetch the products", container);
        console.log(error);
    }
})();


// get images
const imageUrl = baseUrl + "home";

(async function getImages() {
    try {
        const response = await fetch(imageUrl);
        const image = await response.json();
        const hero = document.querySelector(".hero-container");
        hero.innerHTML += `<img class="banner-img" src="${image.hero_banner.url}" alt="${image.hero_banner.alternativeText}">`;
    }
    catch (error) {
        displayMessage("alert-danger", "Missing image", hero)
    }
})();


// get articles
const postsUrl = baseUrl + "posts";
const postContainer = ".post-container";

(async function getPosts() {
    try {
        const response = await fetch(postsUrl);
        const post = await response.json();
        createArticles(post, postContainer);
        console.log(post);
    }
    catch (error) {
        displayMessage("alert-danger", "An error occurred while trying to fetch the articles", postContainer)
    }
})();
