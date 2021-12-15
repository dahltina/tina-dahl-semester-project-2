import { getExistingCart, saveToCart } from "./utils/cartFunctions.js";
import { createMenu } from "./ui/createMenu.js";
import { countItemsInCart } from "./utils/cartFunctions.js";

let cartItems = getExistingCart();
const container = document.querySelector(".cart-container");
const continueBtn = document.querySelector("#cart-button");

createMenu();
countItemsInCart();
createCart();

export function createCart() {

    if (cartItems.length === 0) {
        container.innerHTML = `Nothing here yet.`;
        continueBtn.style.display = "none";
    }

    cartItems.forEach(product => {
        container.innerHTML += `<div class="container product">
                                    <div class="row py-4">
                                        <div class="col-3 d-flex align-items-center">
                                            <img src="${product.image}" class="product-thumb">
                                        </div>
                                        <div class="col-5 d-flex align-items-center justify-content-start">
                                            <h5><a href="product.html?id=${product.id}" class="product-link">${product.name}</a></h5>
                                        </div>
                                        <div class="col-2 d-flex align-items-center justify-content-evenly product-count-container">
                                            <p class="product-quantity">1</p>
                                            <i class="fas fa-minus" data-id="${product.id}" data-name="${product.name}"></i>
                                        </div>
                                        <div class="col-2 d-flex align-items-center justify-content-end">
                                            <p>$<span class="product-price">${product.price}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="line"></div>`

    });

    const deleteBtn = document.querySelectorAll(".fa-minus");
    deleteBtn.forEach(function (trashcan) {
        trashcan.addEventListener("click", deleteItem);
    })
};


function updateCartTotal() {
    const total = [];
    const productPrice = document.querySelectorAll(".product-price");

    productPrice.forEach(function (item) {
        total.push(parseFloat(item.textContent))
    })

    const price = total.reduce(function (total, item) {
        total += item;
        return total;
    }, 0)

    const totalPrice = price.toFixed(2);

    document.querySelector("#total-price").textContent += totalPrice;

};

updateCartTotal();


// delete items in cart
function deleteItem() {

    const name = this.dataset.name;

    // const itemExists = cartItems.find(function (item) {
    //     return item.name === name;
    // })

    const newCart = cartItems.filter(item => item.name !== name);
    cartItems = newCart;
    container.innerHTML = "";
    saveToCart(newCart);
    createCart(cartItems);
    location.reload();
    updateCartTotal();
}


