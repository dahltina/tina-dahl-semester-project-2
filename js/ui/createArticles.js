export function createArticles(data, targetElement) {
    const element = document.querySelector(targetElement);

    element.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        const truncatedContent = truncate(data[i].content, 120);

        element.innerHTML += `<div class="card">
                                    <img src="${data[i].cover.url}" class="card-img-top" alt="${data[i].cover.alternativeText}">
                                    <div class="card-body">
                                        <h3 class="card-title">${data[i].title}</h3>
                                        <p>${truncatedContent}</p>
                                    </div>
                                </div>`
    }
}

function truncate(string, len) {
    return (string.length > len) ? string.substr(0, len - 1) + '&hellip;' : string;
};
