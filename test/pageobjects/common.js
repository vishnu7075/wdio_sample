module.exports = class Common {
	/**
	 * Opening Url
	 * @param {string} url
	 */
	async launchUrl(url) {
		await browser.url(url);
		await browser.maximizeWindow();
	}

	async waitForLoad($locator) {
		await $locator.waitForDisplayed({timeout: 35000});
		await browser.pause(200);
	}
	async click($locator) {
		await this.waitForLoad($locator);
		await $locator.click();
	}

	async setupValue($locator, value) {
		await this.waitForLoad($locator);
		await $locator.setValue(value);
	}
	async setupByAttribute($locator, attribute, value) {
		await this.waitForLoad($locator);
		await $locator.selectByAttribute(attribute, value);
	}
};
