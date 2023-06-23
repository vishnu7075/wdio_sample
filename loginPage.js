// LoginPage.js
class LoginPage {
    get emailInput() {
      return $('#email');
    }
  
    get passwordInput() {
      return $('#pass');
    }
  
    get loginButton() {
      return $('#send2');
    }
  
    async login(email, password) {
      await this.emailInput.setValue(email);
      await this.passwordInput.setValue(password);
      await this.loginButton.click();
    }
  }
  
  module.exports = new LoginPage();
  