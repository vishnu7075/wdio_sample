const { homePage } = require("../pageobjects/home_page"); //Importing Homepage object
const { flightsPage } = require("../pageobjects/flightsPage");//Importing Flights page object
const { completeBookingPage } = require("../pageobjects/completeBookPage");

describe('Work flow for Make my trip', () => {
	it('User should be able to load url', async () => {
		await homePage.openUrl();
		await expect(browser).toHaveUrl('https://www.testingmavens.com/');
		//await expect(await homePage.$homePageHeader().isDisplayed()).toBe(true, 'Expect homepage header to be displayed');
		await browser.pause(500);
	});
});
