document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotalContainer = document.querySelector(".cart-total");

  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    for (let id in cart) {
      const product = cart[id];

      const productCard = document.createElement("div");
      productCard.className =
        "flex justify-between items-center w-500 border-bottom";
      const decreaseDisabled = product.quantity === 1 ? "disabled" : "";
      productCard.innerHTML = `
      <a href="../pages/details.html?id=${id}">
      <img width="100px" src=${product.imageUrl} />
      </a>
        <div class="w-300 h-40 flex gap-20 justify-between items-center">
      <span>${product.name}</span>
      <div class="w-100">
            <button data-id=${id} ${decreaseDisabled} class="decrease">-</button>
            <span>${product.quantity}</span>
            <button data-id=${id} class="increase">+</button>
        </div>
            </div>
            <span>${parseFloat(
              parseFloat(product.price * product.quantity).toFixed(2)
            )} EUR</span>
            <button data-id=${id} class="delete arcade-font">Remove</button>
         `;
      total =
        total +
        parseFloat(parseFloat(product.price * product.quantity).toFixed(2));
      cartItemsContainer.appendChild(productCard);
    }
    total = parseFloat(parseFloat(total).toFixed(2));
    cartTotalContainer.innerHTML =
      total === 0 ? "The cart is empty" : `Total: ${total} EUR`;
  }

  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("increase")) {
      const id = e.target.getAttribute("data-id");
      cart[id].quantity += 1;
    } else if (e.target.classList.contains("decrease")) {
      const id = e.target.getAttribute("data-id");
      cart[id].quantity -= 1;
    } else if (e.target.classList.contains("delete")) {
      const id = e.target.getAttribute("data-id");
      delete cart[id];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  });

  updateCart();
});
