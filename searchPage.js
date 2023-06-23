// SearchPage.js
class SearchPage {
    get searchInput() {
      return $('#search');
    }
  
    get searchResults() {
      return $$('.product-item-info');
    }
  
    async searchForItem(itemName) {
      await this.searchInput.setValue(itemName);
      await this.searchInput.keys('Enter');
    }
  
    async clickFirstSearchResult() {
      const firstSearchResult = await this.searchResults[0];
      await firstSearchResult.click();
    }
  }
  
  module.exports = new SearchPage();
  