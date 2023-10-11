const params = require('../../../../.artifacts/parameters.json');
let android = params.platform.includes('android') ? true : false;
import WebView from '../../../../helpers/WebView';

const SELECTORS = {
    WEB_VIEW_SCREEN: android
        ? '*//android.webkit.WebView'
        : '*//XCUIElementTypeWebView',
};

class WebViewScreen extends WebView {
    /**
     * Wait for the screen to be displayed based on Xpath
     *
     * @param {boolean} isShown
     */
    async waitForWebViewIsDisplayedByXpath (isShown = true) {
        $(SELECTORS.WEB_VIEW_SCREEN).waitForDisplayed({
            timeout: 20000,
            reverse: !isShown,
        });
    }
}

export default new WebViewScreen();
