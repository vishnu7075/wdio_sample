const { homePage } = require("../pageobjects/homePage"); //Importing Homepage object

describe('Work flow for Make my trip', () => {
	it('User should be able to load url', async () => {
		await homePage.openUrl();
		await expect(browser).toHaveUrl('https://www.testingmavens.com/');
	});
	it('the login page should have a header displayed', async () => {
		expect(await homePage.$homePageHeader().isDisplayed()).toBe(true, 'Expect homepage header to be displayed');
		await browser.pause(500);
	});

});
