/**
 * Imports
 */
const {remainingTimeout} = require('../pageobjects/helpers');

class Mailsac {
	constructor() {
		this.$emailHeader = () => $('.inbox h2:nth-child(1)');
		this.$$messageSubjects = () => $$('.inbox .row .ng-scope td.ng-binding:nth-child(4)');
		this.$messageBody = () => $('div[ng-if="msg.body"]');
		this.$messageSubject = subject => $('.inbox .row td:nth-child(4)', subject);
		this.$messageLink1 = () => $('div[ng-bind-html="trustAsHtml(msg.body)"]');
		this.$closeButton = () => $('tr > td:not(.ng-hide) button:not(.ng-hide)', 'Close');
		this.$deleteButton = () => $('tr > td:not(.ng-hide) button:not(.ng-hide)', 'Delete...');
		this.$permanentlyDeleteButton = () => $('tr > td:not(.ng-hide) button:not(.ng-hide)', 'Permanently delete');
		this.$emailDescription = () => $('p.ng-binding');
	}

	/**
	 * Methods
	 */

	/**
	 * open mailsac
	 * @param email - email address
	 * @returns
	 */
	async openInbox(email) {
		await browser.url('https://mailsac.com/inbox/' + email);
		await browser.getUrl();
		await this.$emailHeader().waitForDisplayed(15000);
	}
	/**
	 * get the count of mails
	 * @returns {number}
	 */
	async messageCount() {
		let count = await this.$$messageSubjects().length;
		return count;
	}
	/**
	 * Keep opening mailsac, until a message appears
	 * @param email {string} - email address
	 * @param count {number} - beginning count
	 * @param timeout {number} - timeout in ms
	 * @param step {number} - update the page every 'step' milliseconds
	 * @param start - when function was called. Handled by default
	 * @returns
	 */
	async waitUntilMailboxHasMessages(email, count = 0, timeout = 40000, step = 1000, start = +new Date()) {
		await this.openInbox(email);
		if ((await this.messageCount()) === count && remainingTimeout(timeout, start) > 0) {
			await browser.pause(step);
			await this.waitUntilMailboxHasMessages(email, count, timeout, step, start);
		} else if (remainingTimeout(timeout, start) < 0) {
			throw new Error(`${email} doesn't have new messages after sleeping ${timeout} milliseconds`);
		}
	}

	/**
	 * Opens message where by passing subject as a string or 0-based index of a message
	 * @param subject
	 * @returns
	 */
	async openMessage(subject = 0) {
		if (typeof subject === 'number') {
			await this.$$messageSubjects()[subject].click();
		} else {
			await this.$messageSubject(subject).click();
		}

		await this.$messageBody().waitForDisplayed(6000);
	}
	/**
	 * Locates the hyperlink in the email and then navigates to it
	 * @param {ElementFinder} $waitElement
	 */
	async clickHyperlinkFromMail1($waitElement) {
		let registrationLink = await this.$messageLink1().getText();
		let URL = registrationLink.match(/((http|https)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g)[0];
		await browser.url(URL);
		if ($waitElement) await $waitElement.waitForDisplayed({timeout: 10000});
	}
	/**
	 * Click the button
	 * @returns
	 */
	async closeMessage() {
		await this.$closeButton().click();
	}

	/**
	 * Clicks 'Delete...' and then 'Permanently delete' buttons
	 * @returns
	 */
	async deleteMessage() {
		await this.$deleteButton().click();
		await this.$permanentlyDeleteButton().click();
	}

	/**
	 * gets email description text for assertion
	 * @returns {String}
	 */
	async getDescription() {
		return this.$emailDescription().getText();
	}

	/**
	 * Get verification code
	 * @param {element} $element
	 * @returns {string} verification code
	 */
	async getVerificationCode($element) {
		return $element.getText();
	}
}
module.exports = {
	mailsac: new Mailsac(),
};
