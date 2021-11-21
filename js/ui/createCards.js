

export function createCards(data, targetElement) {
    const element = document.querySelector(targetElement);

    element.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        if (data[i].featured) {

            element.innerHTML += `<a href="product.html?id=${data[i].id}">
                                    <div class="card">
                                        <img src="${data[i].image.url}" class="card-img-top" alt="${data[i].image.alternativeText}">
                                        <i class="far fa-heart"></i>
                                        <div class="card-body">
                                            <h3 class="card-title">${data[i].title}</h3>
                                            <p class="price">$ ${data[i].price}</p>
                                        </div>
                                    </div>
                                </a>`
        }
    }
}
