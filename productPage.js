// ProductPage.js
class ProductPage {
    get sizeDropdown() {
      return $('#attribute139');
    }
  
    get addToCartButton() {
      return $('#product-addtocart-button');
    }
  
    async selectSize(size) {
      await this.sizeDropdown.selectByVisibleText(size);
    }
  
    async addToCart() {
      await this.addToCartButton.click();
    }
  }
  
  module.exports = new ProductPage();
  