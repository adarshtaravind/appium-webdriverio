
import webViewScreen from '../../page-objects/webview-screen';
import preLoginPage from '../../page-objects/pre-login-page';

let a;

describe('WebdriverIO and Appium', () => {

    it('Open the application and verify pre-login page is loaded', async () => {
        await preLoginPage.waitForApplication();
		expect(await preLoginPage.$getStartedButton().isDisplayed())
			.withContext('Expect Get started button to be displayed')
			.toBe(true);
    });

    it('Click on the Get Started button and validate login page is loaded', async () => {
        await preLoginPage.$getStartedButton().click();
        await webViewScreen.waitForWebViewIsDisplayedByXpath();
        await webViewScreen.switchToContext('WEBVIEW_com.zipari.fallon.sit');
        expect(await preLoginPage.$userName().isDisplayed())
			.withContext('Expect Login page is displayed')
			.toBe(true);
    });

    it('Enter the login credentials and click on sign in button', async () => {
        await preLoginPage.$userName().setValue('test12.mgf@fallonhealth.org');
        await preLoginPage.$password().setValue('Password@20');
        await preLoginPage.clickSubmitButton();

        expect(await preLoginPage.$secondaryAuthenticationHeader().isDisplayed())
			.withContext('Expect secondary authentication popup displayed')
			.toBe(true);
    });

    it('click on disagree button in secondary authentication popup', async () => {
       await preLoginPage.$disagreeButton().click();
       let a;
    });
});
