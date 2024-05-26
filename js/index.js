import fetchData from "./products.js";
import { renderProducts } from "./products.js";

const buttons = document.querySelectorAll(".p-name");
const heading = document.querySelector("h2");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    heading.textContent = button.textContent;
  });
});

//clear URL parameter
function clearURLParameters() {
  window.history.replaceState({}, document.title, window.location.pathname);
}

document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  let category = urlParams.get("category");

  if (category) {
    clearURLParameters();
  }

  // const data = await fetchData(
  //   "https://api.jsonbin.io/v3/b/66273a04e41b4d34e4e8c1a9"
  // );
  
  const data = await fetchData('https://kfc-backend-4wkv.onrender.com/api/products');

  function updateURL(category) {
    const queryParams = new URLSearchParams({ category: category });
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${queryParams}`
    );
  }

  //render products
  renderProducts(data);

  const categoryButtons = document.querySelectorAll(".p-name");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const clickedCategory = button.getAttribute("data-category");
      updateURL(clickedCategory);
      filterProducts(clickedCategory, data);
    });
  });
});

function showSidebar() {
  const sidebar = document.querySelector(".sidebar1");
  sidebar.style.display = "flex";
  console.log("Sidebar shown");
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
  console.log("Sidebar hidden");
  const parent = document.getElementById("side2");
  const newli = document.createElement("li");
  newli.classList.add("toggle");
  newli.addEventListener("click", showSidebar);
  newli.innerHTML = ' <i  class="fas fa-bars"></i>';
  const oldli = document.querySelector(".toggle2");
  parent.removeChild(oldli);
  parent.appendChild(newli);
}
