const Commom = require("./common");

class Homepage extends Commom {
	constructor() {
		super();
		this.$searchFromlocation = () => $(`//span[text()='From']`)
		this.$fromLocation = () => $(`//input[@aria-autocomplete="list"]`);
		this.$fromLocationclick = () => $(`//p[text()='Kochi, India']`);
		this.$fromDate = () => $(`(//p[text()='1'])[2]`);
		this.$searchToLocation = () => $(`//label[@for='toCity']`);
		this.$toLocation = () => $(`//input[@aria-autocomplete="list"]`);
		this.$toLocationClick = () => $(`//p[contains(text(),'Goa')]`);
		this.$toDate = () => $(`//p[text()='1']`);
		this.$searchButton = () => $(`//a[text()='Search']`);
		this.$hotels = () => $(`//a[@href="https://www.makemytrip.com/hotels/"]`);
		this.$holiday = () => $(`//a[@href="https://www.makemytrip.com/holidays-india/"]`);

	}
	/**
	 * Function to select from and to destination
	 */
	async selectLocation() {
		await this.$searchFromlocation().click();
		await this.$fromLocation().setValue("Kochi , India");
		await this.$fromLocationclick().click();
		await this.$fromDate().click();
		await this.$searchToLocation().click();
		await this.$toLocation().setValue("goa");
		await this.$toLocationClick().click()
		await this.$toDate().click();
	}

	 /**
	 * Function to Search Flights
	 */
	  async searchFlights() {
		await this.$searchButton().click();
	}

	async selectHotels()
	{
		await this.$hotels().click();
	}
	async holidayPackages() {
		await this.$holiday().click();
	}



	
}

//exporting as Homepage object

module.exports = { homePage : new Homepage () }