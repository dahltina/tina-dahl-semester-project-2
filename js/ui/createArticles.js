

export function createArticles(data, targetElement) {
    const element = document.querySelector(targetElement);

    element.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        element.innerHTML += `<div class="card">
                                    <img src="${data[i].cover.url}" class="card-img-top" alt="${data[i].cover.alternativeText}">
                                    <div class="card-body">
                                        <h3 class="card-title">${data[i].title}</h3>
                                        <p> ${data[i].published_date}</p>
                                    </div>
                                </div>`
    }
}
