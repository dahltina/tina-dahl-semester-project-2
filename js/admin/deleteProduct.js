import { baseUrl } from "../constants/api.js";
import { getToken } from "../utils/userFunctions.js";

export function deleteProduct(id) {

  const deleteBtn = document.querySelector("#deleteBtn");

  deleteBtn.onclick = async function () {

    const deleteProduct = confirm("Are you sure you want to delete this product?");

    if (deleteProduct) {

      const url = baseUrl + "products/" + id;
      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();

        location.href = "products.html";
      }
      catch (error) {
        console.log(error);
      }
    }
  }
}
