class BasketComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <style>
          @import url('css/basket.css');
        </style>
        <div id="overlay"></div>
        <div class="top">
          <button class="go-back">
            <a href="/index.html">
              <img src="assets/go-back.png" alt="Go Back button" class="back-icon" />
            </a>
          </button>
          <h1 class="title">Сагсан дахь бүтээгдэхүүнүүд</h1>
        </div>
        <section id="big-container">
          <section class="order-details">
            <div class="products-container"></div>
          </section>
          <section class="payment">
            <div class="paysub">
              <h3>Барааны үнэ:</h3>
              <h3 id="prod-price">0₮</h3>
            </div>
            <div class="taxisub">
              <h3>Хүргэлтийн үнэ:</h3>
              <h3>3000₮</h3>
            </div>
            <div class="coupon">
              <input id="c" type="text" placeholder="Coupon Code" />
              <button class="check-btn">Шалгах</button>
            </div>
            <input type="text" placeholder="Хаяг" />
            <input type="tel" placeholder="Утасны дугаар" />
            <div class="totalpaysub">
              <h3>Нийт үнэ:</h3>
              <h3 id="total-price">0₮</h3>
            </div>
            <button class="add-products">Бүтээгдэхүүн нэмэх</button>
            <button class="order-verify">Захиалга баталгаажуулах</button>
          </section>
          <section class="recommendation">
          <div id="rec">
              <h2>Санал болгох бүтээгдэхүүнүүд</h2>
          </div>
          <div class="products-container" id="recommended-products"></div>
      </section>
    </section>
      `;
  
      this.initializeBasket();
      this.setupEventListeners();
      this.fetchAndRenderRecommendedProducts();
    }
    setupEventListeners() {
        const addProductsButton = this.shadowRoot.querySelector('.add-products');
        const orderVerifyButton = this.shadowRoot.querySelector('.order-verify');
    
        addProductsButton.addEventListener('click', () => {
          window.location.href = '/index.html';
        });
    
        orderVerifyButton.addEventListener('click', () => {
          alert('Order accepted');
        });
      }
    async initializeBasket() {
      const basket = JSON.parse(localStorage.getItem("basket")) || [];
      const productsContainer = this.shadowRoot.querySelector(".products-container");
      const prodPrice = this.shadowRoot.getElementById("prod-price");
      const totalPrice = this.shadowRoot.getElementById("total-price");
  
      let price = 0;
  
      if (basket.length === 0) {
        productsContainer.innerHTML = "<p>Сагсанд бүтээгдэхүүн алга.</p>";
      } else {
        basket.forEach((product) => {
          price += product.price;
  
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
  
          const productName = document.createElement("h2");
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
          minusBtn.addEventListener("click", () => this.updateQuantity(product, -1));
  
          const quantitySpan = document.createElement("span");
          quantitySpan.textContent = "1";
  
          const plusBtn = document.createElement("button");
          plusBtn.classList.add("quantity-btn");
          plusBtn.textContent = "+";
          plusBtn.addEventListener("click", () => this.updateQuantity(product, 1));
  
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
          deleteBtn.addEventListener("click", () => this.removeFromBasket(product));
  
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
    }
  
    updateQuantity(product, change) {
      let basket = JSON.parse(localStorage.getItem("basket")) || [];
  
      const index = basket.findIndex((item) => item.name === product.name);
  
      if (index !== -1) {
        basket[index].quantity = (basket[index].quantity || 1) + change;
        if (basket[index].quantity < 1) {
          basket.splice(index, 1);
        }
        localStorage.setItem("basket", JSON.stringify(basket));
  
        const productContainer = this.shadowRoot.querySelectorAll(".products")[index];
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
        const prodPrice = this.shadowRoot.getElementById("prod-price");
  
        if (prodPrice) {
          prodPrice.textContent = price + "₮";
        }
  
        totalPrice = price + 3000;
        const totalPriceDisplay = this.shadowRoot.getElementById("total-price");
  
        if (totalPriceDisplay) {
          totalPriceDisplay.textContent = totalPrice + "₮";
        }
      }
    }
  
    removeFromBasket(product) {
      let basket = JSON.parse(localStorage.getItem("basket")) || [];
      basket = basket.filter((item) => item.name !== product.name);
      localStorage.setItem("basket", JSON.stringify(basket));
      location.reload();
    }

    async fetchAndRenderRecommendedProducts() {
        const jsonBinUrl = 'https://api.jsonbin.io/v3/b/66273a04e41b4d34e4e8c1a9';
        try {
            const response = await fetch(jsonBinUrl);
            const data = await response.json();
            const products = data.record.products;
            this.renderProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
      renderProducts(products) {
        const recommendedProductsContainer = this.shadowRoot.getElementById('recommended-products');
        recommendedProductsContainer.innerHTML = ''; // Clear any existing content

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('box');

            const img = document.createElement('img');
            img.src = product.image; // Assuming you have an image field in your product data
            img.alt = product.name;
            productElement.appendChild(img);

            const productName = document.createElement('h5');
            productName.textContent = product.name;

            const productPrice = document.createElement('h4');
            productPrice.textContent = `Price: $${product.price}`;

            const detailhover = document.createElement('div');
            detailhover.classList.add('detail-hover');
            const desc = document.createElement('h6');
            desc.textContent = product.desc; // Assuming you have a desc field in your product data
            detailhover.appendChild(productName);
            detailhover.appendChild(desc);
            detailhover.appendChild(productPrice);

            const button = document.createElement('button');
            button.textContent = 'Сагсанд хийх';
            button.classList.add('add-to-basket-btn');
            button.addEventListener('click', () => this.addToBasket(product));
            detailhover.appendChild(button);

            productElement.appendChild(detailhover);

            recommendedProductsContainer.appendChild(productElement);
        });
    }
}

customElements.define('basket-component', BasketComponent);
  