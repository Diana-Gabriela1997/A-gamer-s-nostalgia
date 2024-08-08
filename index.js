document.addEventListener("DOMContentLoaded", displayAllProducts);
const mainContainer = document.querySelector(".main");

function getAllProducts() {
  const url = "https://66b20d561ca8ad33d4f65330.mockapi.io/products";
  return fetch(url).then((response) => response.json());
}

function displayAllProducts() {
  getAllProducts().then(
    (products) =>
      (mainContainer.innerHTML = products
        .map(
          (product) =>
            `
        <div class="product-card flex-col gap-20 items-center justify-between">
        <h3 class="card-title">${product.name}</h3>
        <img src=${product.imageUrl} width="150px"/>
        <p class="card-price">${product.price} EUR</p>
        </div>
        `
        )
        .join(" "))
  );
}
