const Commom = require("./common");

class Flightspage extends Commom {
    constructor() {
        super();
        this.$flightsPageHeader = () => $(`//span[text()='Flights']`);
        this.$popUp = () => $(`//button[text()='OKAY, GOT IT!']`);
        this.$sortPrice = () => $(`//span[text()='Price']`);
        this.$sortIcon = () => $(`//span[@class=' appendLeft10 down sort-arrow']`);
        this.$viewPrice = () => $(`//span[text()='View Prices']`);
        this.$$priceToBeSorted = () => $$(`//p[@class="blackText fontSize18 blackFont white-space-no-wrap"]`);

    }

    /**
     * Function to sort price
     */
    async sortPrice() {
        this.$popUp().waitForDisplayed(5000);
        this.$popUp().click();
        await this.$sortPrice().click();
        await this.$viewPrice().click();
    }


}
//exporting as Flightpage object

module.exports = { flightsPage: new Flightspage() }