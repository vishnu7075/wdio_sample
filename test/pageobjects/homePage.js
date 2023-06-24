const Common = require('../pageobjects/common');
const testData = require('../testdata/testData.json');

class HomePage extends Common {
	constructor() {
		super();
		this.$mainModule = icon => $(`//span[contains(text(),"${icon}")]`);
		this.$subModule = icon => $(`//span[text()='Men']//following::span[contains(text(),'${icon}')]`);
		this.$subCatagory = icon => $(`//h1//span[contains(text(),"${icon}")]`);
		//span[contains(text(),"Women")]
	}

	async moveToMainModule(element) {
		await this.waitForLoad(this.$mainModule(element));
		await this.$mainModule(element).moveTo();
	}

	async moveToSubModule(element) {
		await this.waitForLoad(this.$subModule(element));
		await this.$subModule(element).moveTo();
	}
}
module.exports = {
	homePage: new HomePage(),
};
