export default async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export function renderProducts(products) {
  const productContainer = document.getElementById("product-desc");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const box = document.createElement("div");
    box.classList.add("box");

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    box.appendChild(img);

    const detail = document.createElement("div");
    detail.classList.add("detail-default");

    const name = document.createElement("h5");
    name.textContent = product.name;
    detail.appendChild(name);

    const price = document.createElement("h4");
    price.textContent = product.price + " ₮";
    detail.appendChild(price);
    box.appendChild(detail);

    const detailhover = document.createElement("div");
    detailhover.classList.add("detail-hover");
    const name2 = document.createElement("h5");
    name2.textContent = product.name;
    detailhover.appendChild(name2);
    const desc = document.createElement("h6");
    desc.textContent = product.desc;
    detailhover.appendChild(desc);
    const price2 = document.createElement("h4");
    price2.textContent = product.price + " ₮";
    detailhover.appendChild(price2);
    const button = document.createElement("button");
    button.textContent = "Сагсанд хийх";
    button.classList.add("add-to-basket-btn");
    button.addEventListener("click", () => addToBasket(product));
    detailhover.appendChild(button);
    box.appendChild(detailhover);

    productContainer.appendChild(box);
  });
}

function filterProducts(category, data) {
  if (category === "All") {
    renderProducts(data);
  } else {
    const filteredData = data.filter(
      (product) => product.category === category
    );
    renderProducts(filteredData);
  }
}

async function initializePage() {
  const data = await fetchData(
    "https://api.jsonbin.io/v3/b/66273a04e41b4d34e4e8c1a9"
  );

  renderProducts(data.record.products);

  let category = "All";

  const categoryButtons = document.querySelectorAll(".p-name");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      category = button.textContent.trim();

      filterProducts(category, data.record.products);
    });
  });

  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", function (event) {
    const searchText = event.target.value.trim().toLowerCase();

    const filteredProducts = data.record.products.filter((product) =>
      product.name.toLowerCase().includes(searchText)
    );

    if (searchText !== "") {
      filterProducts(category, filteredProducts);
    } else {
      filterProducts(category, data.record.products);
    }
  });
}

function addToBasket(product) {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  basket.push(product);
  localStorage.setItem("basket", JSON.stringify(basket));

  alert("Бүтээгдэхүүнийг сагсанд нэмсэн!");
}

document.addEventListener("DOMContentLoaded", initializePage);
