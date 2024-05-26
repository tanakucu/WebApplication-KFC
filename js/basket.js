document.addEventListener("DOMContentLoaded", function () {
  const dialog = document.getElementById("myDialog");
  window.showDialog = function () {
    if (dialog) {
      dialog.show();
      document.getElementById("overlay").style.display = "block";
    } else {
      console.error("Dialog element not found");
    }
  };

  window.closeDialog = function () {
    if (dialog) {
      dialog.close();
      document.getElementById("overlay").style.display = "none";
    } else {
      console.error("Dialog element not found");
    }
  };
});

function showSidebar() {
  const sidebar = document.querySelector(".sidebar1");
  sidebar.style.display = "flex";
  console.log("nnn");
  const parent = document.getElementById("side2");

  const newli = document.createElement("li");
  newli.classList.add("toggle2");
  newli.addEventListener("click", hideSidebar);
  newli.innerHTML = ' <i class="fa-solid fa-x"></i>';
  const oldli = document.querySelector(".toggle");
  parent.removeChild(oldli);
  parent.appendChild(newli);
}
function hideSidebar() {
  const sidebar = (document.querySelector(".sidebar1").style.display = "none");
  const parent = document.getElementById("side2");
  const newli = document.createElement("li");

  newli.classList.add("toggle");
  newli.addEventListener("click", showSidebar);
  newli.innerHTML = ' <i  class="fas fa-bars"></i>';

  const oldli = document.querySelector(".toggle2");
  parent.removeChild(oldli);
  parent.appendChild(newli);
}

document.addEventListener("DOMContentLoaded", function () {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const productsContainer = document.querySelector(".order-details");
  const prodPrice = document.getElementById("prod-price");
  const totalPrice = document.getElementById("total-price");

  let price = 0;

  if (basket.length === 0) {
    productsContainer.innerHTML = "<p>Сагсанд бүтээгдэхүүн алга.</p>";
  } else {
    basket.forEach((product) => {
      price = price + product.price;

      prodPrice.textContent = price + " ₮";
      totalPrice.textContent = price + 3000 + " ₮";

      const productDiv = document.createElement("div");
      productDiv.classList.add("products");

      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-image");

      const productInfo = document.createElement("div");
      productInfo.classList.add("product-info");

      const productName = document.createElement("h4");
      productName.textContent = product.name;

      const productDesc = document.createElement("p");
      productDesc.textContent = product.desc;

      const productActions = document.createElement("div");
      productActions.classList.add("product-actions");

      const productPrice = document.createElement("p");
      productPrice.textContent = product.price + " ₮";

      const quantityDiv = document.createElement("div");
      quantityDiv.classList.add("quantity");

      const minusBtn = document.createElement("button");
      minusBtn.classList.add("quantity-btn");
      minusBtn.textContent = "-";
      minusBtn.addEventListener("click", () => updateQuantity(product, -1));

      const quantitySpan = document.createElement("span");
      quantitySpan.textContent = "1";

      const plusBtn = document.createElement("button");
      plusBtn.classList.add("quantity-btn");
      plusBtn.textContent = "+";
      plusBtn.addEventListener("click", () => updateQuantity(product, 1));

      quantityDiv.appendChild(minusBtn);
      quantityDiv.appendChild(quantitySpan);
      quantityDiv.appendChild(plusBtn);

      productActions.appendChild(productPrice);
      productActions.appendChild(quantityDiv);

      const editBtn = document.createElement("button");
      editBtn.classList.add("edit");
      const editIcon = document.createElement("img");
      editIcon.src = "assets/edit.png";
      editIcon.alt = "edit button";
      editIcon.classList.add("edit-icon");
      editBtn.appendChild(editIcon);

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete");
      const deleteIcon = document.createElement("img");
      deleteIcon.src = "assets/delete.png";
      deleteIcon.alt = "delete button";
      deleteIcon.classList.add("delete-icon");
      deleteBtn.appendChild(deleteIcon);
      deleteBtn.addEventListener("click", () => removeFromBasket(product));

      productActions.appendChild(editBtn);
      productActions.appendChild(deleteBtn);

      productInfo.appendChild(productName);
      productInfo.appendChild(productDesc);

      productDiv.appendChild(img);
      productDiv.appendChild(productInfo);
      productDiv.appendChild(productActions);

      productsContainer.appendChild(productDiv);
    });
  }
});

function updateQuantity(product, change) {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];

  const index = basket.findIndex((item) => item.name === product.name);

  if (index !== -1) {
    basket[index].quantity = (basket[index].quantity || 1) + change;
    if (basket[index].quantity < 1) {
      basket.splice(index, 1);
    }
    localStorage.setItem("basket", JSON.stringify(basket));

    const productContainer = document.querySelectorAll(".products")[index];
    const quantitySpan = productContainer.querySelector(".quantity span");
    const minusBtn = productContainer.querySelector(
      ".quantity button:first-child"
    );

    if (quantitySpan) {
      quantitySpan.textContent = basket[index].quantity || 1;
    }

    if (minusBtn) {
      minusBtn.style.display =
        basket[index].quantity > 1 ? "inline-block" : "none";
    }

    let price = 0,
      totalPrice = 0;

    basket.forEach((item) => {
      price += item.price * (item.quantity || 1);
    });
    const prodPrice = document.getElementById("prod-price");

    if (prodPrice) {
      prodPrice.textContent = price + "₮";
    }

    totalPrice = price + 3000;
    const totalPriceDisplay = document.getElementById("total-price");

    if (totalPriceDisplay) {
      totalPriceDisplay.textContent = totalPrice + "₮";
    }
  }
}

function removeFromBasket(product) {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  basket = basket.filter((item) => item.name !== product.name);
  localStorage.setItem("basket", JSON.stringify(basket));
  window.location.reload();
}

const couponInput = document.getElementById("c");
const checkBtn = document.querySelector(".check-btn");

checkBtn.addEventListener("click", () => {
  const couponCode = couponInput.value.trim();
  if (couponCode === "TA234A") {
    applyDiscount(0.2);
  } else {
    alert("Хүчингүй купон код");
  }
});

function applyDiscount(discountRate) {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  let price = 0;

  basket.forEach((item) => {
    price += item.price * (item.quantity || 1);
  });

  const discountedPrice = price * (1 - discountRate);
  const totalPrice = discountedPrice + 3000;

  const prodPrice = document.getElementById("prod-price");
  if (prodPrice) {
    prodPrice.textContent = discountedPrice.toFixed(2) + "₮";
  }

  const totalPriceDisplay = document.getElementById("total-price");
  if (totalPriceDisplay) {
    totalPriceDisplay.textContent = totalPrice.toFixed(2) + "₮";
  }
}
