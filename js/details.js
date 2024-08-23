import { getProductById } from "../api/products.js";

document.addEventListener("DOMContentLoaded", showProductDetails);

async function showProductDetails() {
  const urlSearchParam = new URLSearchParams(window.location.search);
  const productId = urlSearchParam.get("id");

  const product = await getProductById(productId);

  document.querySelector(".main").innerHTML = `
  <h2>${product.name}</h2>
  <img src=${product.imageUrl} width="150px"/>
  <h2>Price: ${product.price} EUR</h2>
  <h2> Year of release: ${product.yearOfRelease} </h2>
  <h3>Details: ${product.details}</h3>
  `;
}
