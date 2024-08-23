import { getAllProducts } from "./api/products.js";
import { mapProductToCard } from "./utils/layout.js";

document.addEventListener("DOMContentLoaded", displayAllProducts);
const mainContainer = document.querySelector(".main");
const yearFilterContainer = document.querySelector(".years");
let yearsSelected = [];

async function displayAllProducts() {
  const products = await getAllProducts();
  mainContainer.innerHTML = products.map(mapProductToCard).join(" ");

  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      const price = button.getAttribute("data-price");
      const name = button.getAttribute("data-name");
      const imageUrl = button.getAttribute("data-image");

      let cart = JSON.parse(localStorage.getItem("cart")) || {};
      if (cart[productId]) {
        cart[productId].quantity += 1;
      } else {
        cart[productId] = {
          quantity: 1,
          price: price,
          name: name,
          imageUrl: imageUrl,
        };
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });

  const yearsOfRelease = products.map((product) => product.yearOfRelease);
  let uniqueYearsOfRelease = Array.from(new Set(yearsOfRelease));
  uniqueYearsOfRelease.sort();

  yearFilterContainer.innerHTML += uniqueYearsOfRelease
    .map(
      (yearOfRelease) =>
        `
    <label><input class="year-filter" type="checkbox" value="${yearOfRelease}">${yearOfRelease}</label><br>
        `
    )
    .join("");

  yearFilterContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("year-filter")) {
      const year = e.target.getAttribute("value");
      if (e.target.checked === true) {
        yearsSelected.push(year);
      } else {
        yearsSelected = yearsSelected.filter((e) => e !== year);
      }
      mainContainer.innerHTML = products
        .filter((product) => {
          if (
            yearsSelected.length == 0 ||
            yearsSelected.includes(product.yearOfRelease.toString()) === true
          )
            return product;
        })
        .map(mapProductToCard)
        .join(" ");
    }
  });
}
