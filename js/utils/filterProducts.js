import { createCards } from "../ui/createCards.js";

const input = document.querySelector("input#search");

export function filterProducts(data, targetElement) {

    function filteredProducts() {

        const inputValue = event.target.value.trim().toLowerCase();

        const filteredData = data.filter(function(data) {
            if (data.title.toLowerCase().includes(inputValue)) {
                return true;
            }
        });

        createCards(filteredData, targetElement);
    }

    input.addEventListener("keyup", filteredProducts);
    clearInput();
}

function clearInput() {
    window.onload = input.value = "";
  }
