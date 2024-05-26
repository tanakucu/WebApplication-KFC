const dialog = document.getElementById("myDialog");

class HeaderSection extends HTMLElement {
  constructor() {
    super();
    this.#render();
  }

  connectedCallback() {}

  #render() {
    this.innerHTML = `
        <header class="test">
        <ul id="side2">
          <li>
            <a href="index.html"
              ><img src="assets/logo.png" alt="KFC-Logo" class="logo"
            /></a>
          </li>
          <li class="hideonmobile"><a class="navbar-text" href="index.html">Меню</a></li>
          <li class="hideonmobile"><a class="navbar-text" href="branch.html">Салбар</a></li>
          <li class="hideonmobile"><a class="navbar-text" href="about.html">Бидний тухай</a></li>
  
          <li class="hideonmobile">
            <a class="navbar-text" href="basket.html">
              <img
                src="assets/cart.png"
                alt="Shopping-cart"
                class="cart-icon"
              />Сагс</a
            >
          </li>
          <li class="hideonmobile">
            <button class="navbar-text" onclick="showDialog()">
              <img src="assets/login.png" alt="login-icon" class="login-icon" />
              Нэвтрэх
            </button>
          </li >
          <li onclick=showSidebar() class="toggle"   ><i  class="fas fa-bars"></i></li>
        </ul>
      <dialog id="myDialog">
        <div id="container">
          <button id="dialogue-button-1" onclick="closeDialog()">x</button>
          <h3>Нэвтрэх</h3>
          <label for="">Утасны дугаар</label>
          <input type="number" placeholder="Утасны дугаар" />
          <label for="">Нууц үг</label>
          <input type="password" placeholder="Нууц үг" />
          <button id="dialogue-button-2">Нэвтрэх</button>
          <a href="register.html"> Бүртгүүлэх</a>
        </div>
      </dialog>
    </div>
  </header>
  <header class="sidebar">
    <ul class="sidebar1" id="side1">
      <li><a class="navbar-text" href="index.html">Меню</a></li>
      <li><a class="navbar-text" href="branch.html">Салбар</a></li>
      <li><a class="navbar-text" href="about.html">Бидний тухай</a></li>

      <li>
        <a class="navbar-text" href="basket.html">
          <img
            src="assets/cart.png"
            alt="Shopping-cart"
            class="cart-icon"
          />Сагс</a
        >
      </li>
      <li>
        <button class="navbar-text" onclick="showDialog()">
          <img src="assets/login.png" alt="login-icon" class="login-icon" />
          Нэвтрэх
        </button>
      </li>
    </ul>
  <dialog id="myDialog">
    <div id="container">
      <button id="dialogue-button-1" onclick="closeDialog()">x</button>
      <h3>Нэвтрэх</h3>
      <label for="">Утасны дугаар</label>
      <input type="number" placeholder="Утасны дугаар" />
      <label for="">Нууц үг</label>
      <input type="password" placeholder="Нууц үг" />
      <button id="dialogue-button-2">Нэвтрэх</button>
      <a href="register.html"> Бүртгүүлэх</a>
    </div>
  </dialog>
  </div>
  </header>
        `;
  }
}

window.customElements.define("header-section", HeaderSection);
