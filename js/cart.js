import { getExistingCart } from "./utils/cartFunctions.js";

const cartItems = getExistingCart();
const container = document.querySelector(".cart-container");

cartItems.forEach(product => {
    container.innerHTML += `<div class="container product">
                                <div class="row py-4">
                                    <div class="col-3 d-flex align-items-center">
                                        <img src="${product.image}" class="product-thumb">
                                    </div>
                                    <div class="col-5 d-flex align-items-center justify-content-start">
                                        <h5><a href="" class="product-link">${product.name} LINK</a></h5>
                                    </div>
                                    <div class="col-2 d-flex align-items-center justify-content-evenly product-count-container">
                                        <i class="fas fa-plus"></i>
                                        <p>${product.count}</p>
                                        <i class="fas fa-minus"></i>
                                    </div>
                                    <div class="col-2 d-flex align-items-center justify-content-end">
                                        <p class="product-price">${product.price}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="line"></div>`
})

function updateCartTotal() {
    const total = [];
    const productPrice = document.querySelectorAll(".product-price");

    productPrice.forEach(function(item) {
        total.push(parseFloat(item.textContent))
    })

    const price = total.reduce(function(total, item){
        total += item;
        return total;
    }, 0)


    const totalPrice = price.toFixed(2);

    document.querySelector("#total-price").textContent += totalPrice;

    // display number of items in cart badge
    let countItems = total.length;
    const cartCount = document.querySelector("#cart-count");
    cartCount.innerHTML = countItems;
    return cartCount;
};

updateCartTotal()

// JSON.parse(localStorage.keyname).length
