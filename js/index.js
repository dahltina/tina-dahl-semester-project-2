import { baseUrl } from "./constants/api.js";
import { createCards } from "./ui/createCards.js";
import { createArticles } from "./ui/createArticles.js";

const productsUrl = baseUrl + "products";

const container = ".featured-products-container";

async function getProducts() {

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();
        const products = json;
        createCards(products, container);

    }
    catch (error) {
        console.log(error);
    }
}

getProducts();

// get images
const imageUrl = baseUrl + "home";

async function getImages() {
    try {
        const response = await fetch(imageUrl);
        const image = await response.json();
        const hero = document.querySelector(".hero-container");
        hero.innerHTML += `<img class="banner-img" src="${image.hero_banner.url}" alt="${image.hero_banner.alternativeText}">`;
    }
    catch (error) {
        console.log(error);
    }
}

getImages();


// get articles
const postsUrl = baseUrl + "posts";
const postContainer = ".post-container";

async function getPosts() {
    try {
        const response = await fetch(postsUrl);
        const post = await response.json();
        createArticles(post, postContainer);
    }
    catch (error) {
        console.log(error);
    }
}

getPosts();
