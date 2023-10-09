import Page from './page';

class FormPage extends Page {
    constructor() {
        super();
        this.$appScreen = () => $('android=new UiSelector().classNameMatches("android.widget.Button").textContains("GET STARTED")');
        this.$getStartedButton = () => $('android=new UiSelector().classNameMatches("android.widget.Button").textContains("GET STARTED")');
        this.$userName = () => $('input[name="username"]');
    }
    /**
     * define elements
     */
    get username () { return $('#username'); }
    get password () { return $('#password'); }
    get submitButton () { return $('#login button[type=submit]'); }
    get flash () { return $('#flash'); }
   // get $appScreen() {return $('android=new UiSelector().resourceIdMatches("com.zipari.fallon.sit:id/action_bar_root")');}
   // get $getStartedButton() {return $('')}

    /**
     * define or overwrite page methods
     */
    open () {
        super.open('login');
    }

    submit () {
        browser.hideKeyboard();
        this.submitButton.click();
    }

    async waitForApplication() {
		await this.$appScreen().waitForDisplayed({timeout: 20000, timeoutMsg: 'Failed waiting for app screen to be loaded'});
	}
}

export default new FormPage();
