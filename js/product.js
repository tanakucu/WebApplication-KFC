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
           <h4>${this.name}</h4>
           <h3>${this.price}</h3>
          </div>
          <div class="detail-hover">
          <h4>${this.name}</h4> 
          <h5>${this.desc}</h5> 
          <h3>${this.price}</h3>
          <button>Сагсанд хийх</button>
        </div>
         </div>`;
  }
}
