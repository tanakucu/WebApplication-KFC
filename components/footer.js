class FooterSection extends HTMLElement {
  constructor() {
    super();
    this.#render();
  }

  connectedCallback() {}

  #render() {
    this.innerHTML = `
    <footer>
    <div id="box-1">
      <h3 class="footer-header-text">Тусламж үйлчилгээ</h3>
      <ul>
        <ol>
          <a class="footer-text" href="#">Илчлэгийн мэдээлэл</a>
        </ol>
        <ol>
          <a class="footer-text" href="#">Нийгмийн хариуцлага</a>
        </ol>
        <ol>
          <a class="footer-text" href="#">Хүний нөөц</a>
        </ol>
      </ul>
    </div>
    <div id="box-2">
      <h3 class="footer-header-text">Бидэнтэй холбогдох</h3>
      <ul>
        <ol>
          <a class="footer-text" href="https://www.facebook.com/KFC.Mongoola/"
            >Facebook</a
          >
        </ol>
        <ol>
          <a
            class="footer-text"
            href="https://www.instagram.com/kfc_mongoola/"
            >Instagram</a
          >
        </ol>
        <ol>
          <a class="footer-text" href="https://twitter.com/MongoliaKfc"
            >Twitter</a
          >
        </ol>
      </ul>
    </div>
    <div id="box-3" class="comment">
      <h3 class="footer-header-text">Санал хүсэлт</h3>
      <input class="form-phone" type="text" placeholder="Утасны дугаар" />
      <input class="form-feedback" type="text" placeholder="Санал хүсэлт" />
      <button id="button-footer">Илгээх</button>
    </div>
    <p class="copyright">&copy; 2024 KFC. All rights reserved.</p>
  </footer>
</body>
          `;
  }
}

window.customElements.define("footer-section", FooterSection);
