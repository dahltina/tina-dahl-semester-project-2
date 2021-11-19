import { baseUrl } from "./constants/api.js";
import { createProducts } from "./ui/createProducts.js";
import { createArticles } from "./ui/createArticles.js";

const productsUrl = baseUrl + "products";

const container = ".featured-products-container";

async function getProducts() {
    try {
        const response = await fetch(productsUrl);
        const json = await response.json();
        console.log(json);
        const products = json;
        createProducts(products, container);

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
        console.log(image);
        return image;
    }
    catch (error) {
        console.log(error);
    }
}

//display hero image
const image = await getImages();
const hero = document.querySelector(".hero-container");

hero.innerHTML += `<img class="banner-img" src="${image.hero_banner.url}" alt="${image.hero_banner.alternativeText}">`;


// get articles

const postsUrl = baseUrl + "posts";
const postContainer = ".post-container";

async function getPosts() {
    try {
        const response = await fetch(postsUrl);
        const post = await response.json();
        console.log(post);
        createArticles(post, postContainer);
    }
    catch (error) {
        console.log(error);
    }
}

getPosts();
