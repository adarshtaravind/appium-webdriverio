import TabBar from '../screenobjects/components/tab.bar';
import WebViewScreen from '../screenobjects/webview.screen';
import { CONTEXT_REF } from '../helpers/WebView';

import forms from '../pageobjects/form.page';
import { timeDifference } from '../helpers/utils';
let a;

describe('WebdriverIO and Appium', () => {
    let start;
    beforeEach(() => {
        // browser.reset();
        // TabBar.waitForTabBarShown(true);
        // TabBar.openWebView();
        // start = Date.now();
    });

    /**
     * CHECK THE CONSOLE FOR THE TIME DIFFERENCE BETWEEN
     * WAITING FOR THE WEBVIEW TO BE LOADED WITH XPATH
     * AND WAITING FOR THE WEBVIEW TO BE LOADED IN A FASTER WAY
     *
     * THIS IS JUST ONE EXAMPLE IN THE DIFFERENCE BETWEEN USING
     * XPATH OR A DIFFERENT LOCATOR STRATEGY
     */
    it('should be able to go to the webview by xpath', async () => {
        // const toggle = $('.navToggle');
        // toggle.click();
        // toggle.waitForDisplayed({ timeout: 30000 });

        await forms.waitForApplication();
		expect(await forms.$getStartedButton().isDisplayed())
			.withContext('Expect Get started button to be displayed')
			.toBe(true);
        await forms.$getStartedButton().click();

        

    });

    it('second it block', async () => {
        a = await driver.getContexts();

    });

    it('second it block', async () => {
        await driver.switchContext(a[2]);

        await forms.$userName().setValue('test12.mgf@fallonhealth.org');
        await forms.$password().setValue('Password@20');

    });
});
