const Common = require('../pageobjects/common');
const testData = require('../testdata/testData.json');
const {mailsac} = require('../pageobjects/mailsac')

class ShippingAddressPage extends Common {
	constructor() {
		super();

		this.$email = () => $("//fieldset[contains(@id,'customer-email-fieldset')]/child::div/descendant::input");
		this.$shippingState = value => $(`//select[@name="${value}"]`);
		this.$shippingAddress = value => $(`//input[@name="${value}"]`);
		this.$shippingMethod = () => $("//td[text()='Fixed']/preceding-sibling::td/child::input");
		this.$next = () => $("//span[text()='Next']");
		this.$paymentMethod = () => $("//div[text()='Payment Method']");
		this.$placeOrder = () => $("//span[text()='Place Order']");
		this.$purchase = () => $("//span[text()='Thank you for your purchase!']");
    this.$createAccountButton = () => $('(//span[text()="Create an Account"])');
    this.$password = () => $('#password');
    this.$confirmPassword = () => $('#password-confirmation');
    this.$orderId = () => $('//h1[text()="Your Order "]/..//span');
	}

	async addShippingAddress(mail) {
		await this.setupValue(this.$email(), mail);
		await this.setupValue(this.$shippingAddress('firstname'), testData.firstName);
		await this.setupValue(this.$shippingAddress('lastname'), testData.lastName);
		await this.setupValue(this.$shippingAddress('street[0]'), testData.street);
		await this.setupValue(this.$shippingAddress('city'), testData.city);
		await this.setupByAttribute(this.$shippingState('region_id'), 'value', testData.region);
		await this.setupValue(this.$shippingAddress('postcode'), testData.postcode);
		await this.setupValue(this.$shippingAddress('telephone'), testData.telephone);
	}

  async fillPassword(password) {
    await this.$password().scrollIntoView({block:'center'});
    await this.$password().setValue(password);
    await this.$confirmPassword().setValue(password);
  }

  async openMail(email, array) {
		// opening new tab for mail validation
		await browser.executeScript('window.open()', []);
		let handles = await browser.getWindowHandles();
		await browser.switchToWindow(handles[1]); // switch to the new tab
		await mailsac.waitUntilMailboxHasMessages(email, 0, 40000, 2000);
		let subject = 'our Main Website Store order confirmation';
		await mailsac.openMessage(subject);
    let orderId = await this.$orderId().getText();
    array.push(orderId.replace('#', ''));
		await browser.closeWindow();
		await browser.switchToWindow(handles[0]); // switch back to the original tab
    return array;
	}
}

module.exports = {
	shippingAddressPage: new ShippingAddressPage(),
};
