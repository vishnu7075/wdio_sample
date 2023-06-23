const Commom = require("./common");

class Completebookpage extends Commom {
    constructor(){
        super();
        this.$completeBookingheader = () => $(`//h2[text()='Complete your booking']`);
        this.$bookButton = () => $(`(//button[text()='Book Now'])[2]`);
        this.$price = () => $(`//span[@class="fontSize16 blackFont"]/ancestor::p[@class='fareRow']/span[contains(text(), "₹")]`);


    }
  /**
     * Function to book flight
     */
   async bookFlight() {
        
    await this.$bookButton().click();

    
}

}

module.exports = { completeBookingPage : new Completebookpage() }