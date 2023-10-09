import Page from './common';
import webViewScreen from '../pageobjects/webview-screen';
import { CONTEXT_REF } from '../helpers/WebView';


class FormPage extends Page {
    constructor() {
        super();
        this.$appScreen = () => $('android=new UiSelector().resourceIdMatches("com.zipari.fallon.sit:id/action_bar_root")');
        this.$getStartedButton = () => $('android=new UiSelector().classNameMatches("android.widget.Button").textContains("GET STARTED")');
        this.$userName = () => $('#okta-signin-username');
        this.$password = () => $('#okta-signin-password');
        this.$submitButton = () => $('#okta-signin-submit');
        this.$secondaryAuthenticationHeader = () => $('android=new UiSelector().resourceIdMatches("com.zipari.fallon.sit:id/secondary_dialog_title")');
        this.$disagreeButton = () => $('android=new UiSelector().resourceIdMatches("com.zipari.fallon.sit:id/secondary_dialog_disagree_button")')
    }
    /**
     * define elements
     */

    /**
     * wait for application to be loaded
     */
    async waitForApplication() {
		await this.$appScreen().waitForDisplayed({timeout: 20000, timeoutMsg: 'Failed waiting for app screen to be loaded'});
	}

    /**
     * wait for application to be loaded
     */
    async clickSubmitButton() {
        await this.$submitButton().click();
        await webViewScreen.switchToContext('NATIVE_APP');
		await this.$secondaryAuthenticationHeader().waitForDisplayed({timeout: 30000, timeoutMsg: 'Failed waiting for app screen to be loaded'});
	}
}

export default new FormPage();
