const Common = require('../pageobjects/common');
const {homePage} = require('../pageobjects/homePage');
const {jacketPage} = require('../pageobjects/jacketPage');
const testData = require('../testdata/testData.json');
const {shippingAddressPage} = require('../pageobjects/shippingAddressPage');

let mail = `newmail_${Math.floor(Math.random() * 100000)}@mailsac.com`;
let password = `passkeyw@${Math.floor(Math.random() * 1000000)}`;
let orderIdArray= [];

describe("Order Men's Jacket", () => {
	it('Launch URL', async () => {
		await homePage.launchUrl(testData.url);
    await browser.maximizeWindow();
		expect(browser).toHaveUrlContaining('softwaretestingboard');
		expect(browser).toHaveTitleContaining('Magento eCommerce');
	});

	it("Navigate to Men's Jacket", async () => {
		await homePage.moveToMainModule('Men');
		await homePage.moveToSubModule('Tops');
		await homePage.moveToSubModule('Jackets');
		await homePage.click(homePage.$subModule('Jackets'));
		expect(await homePage.$subCatagory('Jackets').isDisplayed()).toBe(true, 'Jacket is displayed');
	});

	it('Select Jacket from desired Price Range ', async () => {
		await jacketPage.click(jacketPage.$jacketModule('Price'));
		await jacketPage.jacketPrice('$90.00');
		expect(await jacketPage.$jacketShopingBy('$90.00 and above').isDisplayed()).toBe(true, 'Price filter is displayed');
		await jacketPage.click(jacketPage.$jacketFiltered('Lando Gym Jacket'));
		expect(await jacketPage.$selectedJacket().isDisplayed()).toBe(true, 'Lando Gym Jacket is displayed');
	});

	it('Add Jacket Specifications', async () => {
		await jacketPage.jacketSize('XL');
		await jacketPage.jacketColour('Gray');
		await jacketPage.click(jacketPage.$addToCart());
		await jacketPage.waitForLoad(jacketPage.$myCart());
		expect(await jacketPage.$myCart().isDisplayed()).toBe(true, 'Shopping cart is displayed');
		await jacketPage.click(jacketPage.$myCart());
		expect(await jacketPage.$proceedToCheckout().isDisplayed()).toBe(true, 'Proceed to Checkout is displayed');
		await jacketPage.click(jacketPage.$proceedToCheckout());
		await jacketPage.waitForLoad(jacketPage.$shippingAddress());
		expect(await jacketPage.$shippingAddress().isDisplayed()).toBe(true, 'Checkout is successfully completed');
	});

	it('Add Shipping Address and place order', async () => {
		await shippingAddressPage.addShippingAddress(mail);
		await shippingAddressPage.click(shippingAddressPage.$shippingMethod());
		expect(await shippingAddressPage.$next().isDisplayed()).toBe(true, 'Next button is available');
		await shippingAddressPage.click(shippingAddressPage.$next());
		await shippingAddressPage.waitForLoad(shippingAddressPage.$paymentMethod());
		expect(await shippingAddressPage.$paymentMethod().isDisplayed()).toBe(true, 'Shipping is successfully completed');
		await shippingAddressPage.waitForLoad(shippingAddressPage.$placeOrder());
		expect(await shippingAddressPage.$placeOrder().isDisplayed()).toBe(true, 'Place Order is displayed');
		await shippingAddressPage.click(shippingAddressPage.$placeOrder());
		await shippingAddressPage.waitForLoad(shippingAddressPage.$purchase());
		expect(await shippingAddressPage.$purchase().isDisplayed()).toBe(true, 'Order is Successfully placed');
	});

  it('Open mailsac and get order id', async () => {
    orderIdArray = await shippingAddressPage.openMail(mail, orderIdArray);
	});

  it('Open mailsac and get order id', async () => {
    orderIdArray = await shippingAddressPage.openMail(mail, orderIdArray);
	});

});



