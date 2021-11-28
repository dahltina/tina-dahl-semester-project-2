export function addToCart() {
    const id = this.dataset.id;
    const name = this.dataset.name;
    const price = this.dataset.price;
    const image = this.dataset.image;
    let count = 1;

    const currentCart = getExistingCart();
    console.log(currentCart);

    const productExists = currentCart.find(function(item) {
        return item.id === id;
    });

    if (!productExists) {
        let product = {
            id: id,
            name: name,
            price: price,
            image: image,
            count: count
        };

        currentCart.push(product);
        saveToCart(currentCart);
    }
    else {
        productExists.count ++;
        saveToCart(currentCart);
    }
}

export function getExistingCart() {

    let cartItems = localStorage.getItem("cart");

    if (!cartItems) {
        return [];
    }
    else {
        return JSON.parse(cartItems);
    }
}

function saveToCart(cartItems) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    alert("Added to cart");
}








// export const addToCart = (id, userIsLoggedIn) => {
//     let cart = [];
//     let itemToAdd = {
//         id,
//         count: 1,
//     };
//     if (localStorage.getItem('cart')) {
//         cart = JSON.parse(localStorage.getItem('cart'));
//         let item = cart.find(el => el.id === id);
//         if (!item) {
//             cart.push(itemToAdd);
//         } else {
//             item.count ++;
//         }
//     } else {
//         cart = [itemToAdd];
//     }
//     localStorage.setItem('cart', JSON.stringify(cart))
//     console.log(localStorage.getItem('cart'))
// };

// if (localStorage.getItem("cart")) {
//     cart = JSON.parse(currentCart);
//     let item = cart.find(product => product.id === id);

//     if (!item) {
//         currentCart.push(product);
//         saveToCart(currentCart);
//     }
//     else {
//         item.count ++;
//     }
//     localStorage.setItem('cart', JSON.stringify(cart))
//     console.log(localStorage.getItem('cart'))
// }
