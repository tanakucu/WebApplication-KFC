export default class Product {
  constructor(itemObj) {
    this.name = itemObj.name;
    this.price = itemObj.price;
    this.image = itemObj.image;
    this.desc = itemObj.desc;
  }

  Render() {
    return `
           <div class="box">
           <img src="${this.image}" alt="" />
           <div class="detail-default">
           <h5>${this.name}</h5>
           <h4>${this.price}</h4>
          </div>
          <div class="detail-hover">
          <h5>${this.name}</h5>
          <h6>${this.desc}</h6>
          <h4>${this.price}</h4>
          <button>Сагсанд хийх</button>
        </div>
         </div>`;
  }
}
