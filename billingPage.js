// BillingPage.js
class BillingPage {
    get firstNameInput() {
      return $('#billing\\:firstname');
    }
  
    get lastNameInput() {
      return $('#billing\\:lastname');
    }
  
    // ... add other billing information inputs here
  
    async fillBillingInformation(firstName, lastName) {
      await this.firstNameInput.setValue(firstName);
      await this.lastNameInput.setValue(lastName);
      // ... fill in the remaining billing information fields
    }
  }
  
  module.exports = new BillingPage();
  