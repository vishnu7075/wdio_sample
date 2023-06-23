// CheckoutPage.js
class CheckoutPage {
    get checkoutButton() {
      return $('.action.primary.checkout');
    }
  
    async proceedToCheckout() {
      await this.checkoutButton.click();
    }
  }
  
  module.exports = new CheckoutPage();
  