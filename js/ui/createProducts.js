

export function createProducts(data, targetElement) {
    const element = document.querySelector(targetElement);

    element.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        element.innerHTML += `<a href="product.html">
                                <div class="card">
                                    <img src="${data[i].image.url}" class="card-img-top" alt="${data[i].image.alternativeText}">
                                    <div class="card-body">
                                        <h3 class="card-title">${data[i].title}</h3>
                                        <p class="price">$ ${data[i].price}</p>
                                    </div>
                                </div>
                            </a>`
    }
}
