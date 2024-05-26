class HeaderSection extends HTMLElement {
  constructor() {
    super();
    this.#render();
  }

  connectedCallback() {
    // Add event listener to the hamburger menu icon to show the sidebar
    this.querySelector('.toggle').addEventListener('click', showSidebar);
  }

  #render() {
    this.innerHTML = `
        <header class="test">
          <ul id="side2">
            <li>
              <a href="index.html">
                <img src="assets/logo.png" alt="KFC-Logo" class="logo" />
              </a>
            </li>
            <li class="hideonmobile"><a class="navbar-text" href="index.html">Меню</a></li>
            <li class="hideonmobile"><a class="navbar-text" href="branch.html">Салбар</a></li>
            <li class="hideonmobile"><a class="navbar-text" href="about.html">Бидний тухай</a></li>
            <li class="hideonmobile">
              <a class="navbar-text" href="basket.html">
                <img src="assets/cart.png" alt="Shopping-cart" class="cart-icon" />Сагс
              </a>
            </li>
            <li class="hideonmobile">
              <a class="navbar-text" href="register.html">
                <img src="assets/login.png" alt="login-icon" class="login-icon" />Нэвтрэх
              </a>
            </li>
            <li class="toggle"><i class="fas fa-bars"></i></li> <!-- Added class toggle -->
          </ul>
        </header>
      `;
  }
}

window.customElements.define("header-section", HeaderSection);
