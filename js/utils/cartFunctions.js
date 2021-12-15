
// add to cart
export function addToCart() {
    const id = this.dataset.id;
    const name = this.dataset.name;
    const price = this.dataset.price;
    const image = this.dataset.image;

    const currentCart = getExistingCart();
    console.log(currentCart);

    const productExists = currentCart.find(function (item) {
        return item.id === id;
    });

    if (!productExists) {
        let product = {
            id: id,
            name: name,
            price: price,
            image: image,
        };

        currentCart.push(product);
        saveToCart(currentCart);
        alert("Added to cart");
    }
    else {
        alert("You already have this item in your cart");
    }
}

// get excisting cart
export function getExistingCart() {

    let cartItems = localStorage.getItem("cart");

    if (!cartItems) {
        return [];
    }
    else {
        return JSON.parse(cartItems);
    }
}

const cartCount = document.querySelector("#cart-count");

export function saveToCart(cartItems) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    countItemsInCart();
    cartCount.style.display = "block";
}

// display number of items in cart button badge
export function countItemsInCart() {

    let countItems = getExistingCart().length;
    cartCount.innerHTML = countItems;

    if (!countItems) {
        cartCount.style.display = "none";
    }
}
