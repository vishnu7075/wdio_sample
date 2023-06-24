const Common = require('../pageobjects/common');
const testData = require('../testdata/testData.json');

class JacketPage extends Common {
	constructor() {
		super();
		this.$jacketModule = module => $(`//div[contains(text(),"${module}")]`);
		this.$jacketPrice = price => $(`//span[contains(text(),"${price}")]/parent::a`);
		this.$jacketShopingBy = price => $(`//span[contains(text(),"${price}")]`);
		this.$jacketFiltered = name => $(`//a[contains(text(),"${name}")]`);
		this.$selectedJacket = () => $("//span[contains(text(),'Lando Gym Jacket')]");
		this.$jacketSize = size => $(`//span[contains(text(),'Size')]/following::div[contains(text(),"${size}")]`);
		this.$jacketColour = colour => $(`//span[contains(text(),'Color')]/following::div[contains(@aria-label,"${colour}")]`);
		this.$addToCart = () => $("//span[contains(text(),'Add to Cart')]");
		this.$myCart = () => $("//a[contains(text(),'shopping cart')]");
		this.$proceedToCheckout = () => $("//span[contains(text(),'Proceed to Checkout')]");
		this.$shippingAddress = () => $("//div[contains(text(),'Shipping Address')]");
	}

	async jacketPrice(element) {
		await this.waitForLoad(this.$jacketPrice(element));
		await this.click(this.$jacketPrice(element));
	}

	async jacketSize(element) {
		await this.waitForLoad(this.$jacketSize(element));
		await this.click(this.$jacketSize(element));
	}

	async jacketColour(element) {
		await this.waitForLoad(this.$jacketColour(element));
		await this.click(this.$jacketColour(element));
	}
}

module.exports = {
	jacketPage: new JacketPage(),
};
