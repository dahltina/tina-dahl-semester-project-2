import displayMessage from "../components/displayMessage.js";

export function createCards(data, targetElement) {
    const element = document.querySelector(targetElement);

    element.innerHTML = "";

    if (data.length === 0) {
        displayMessage("alert-warning", "Sorry, we didn't find any matching products", targetElement);
    }

    for (let i = 0; i < data.length; i++) {

        if (data[i].featured) {

            element.innerHTML += `<a href="product.html?id=${data[i].id}"
                                    <div class="card">
                                        <img src="${data[i].image.url}" class="card-img-top" alt="${data[i].image.alternativeText}">
                                        <i class="far fa-heart"></i>
                                        <div class="card-body">
                                            <h3 class="card-title">${data[i].title}</h3>
                                            <p class="product-price mt-4"><span>$ ${data[i].price}</span></p>
                                        </div>
                                    </div>
                                </a>`
        }
    }
}
