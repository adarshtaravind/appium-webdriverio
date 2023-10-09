const {join} = require('path');
const { config } = require('./wdio-shared.conf');
const params = require('../tests/.artifacts/parameters.json');
const data = require(`../${params.configMapping}`).android;


// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        // The defaults you need to have in your config
        platformName: 'Android',
        maxInstances: 1,
        // For W3C the appium capabilities need to have an extension prefix
        // http://appium.io/docs/en/writing-running-appium/caps/
        // This is `appium:` for all Appium Capabilities which can be found here
        'appium:deviceName': `${data.deviceName}`,
        'appium:platformVersion': `${data.platformVersion}`,
        'appium:orientation': `${data.orientation}`,
        // `automationName` will be mandatory, see
        // https://github.com/appium/appium/releases/tag/v1.13.0
        'appium:automationName': 'UiAutomator2',
        // The path to the app
        'appium:app': data.app,
        'appium:appPackage': `${data.appPackage}`, // specify package name of app
		'appium:appActivity': `${data.appActivity}`, // specify initial activity of app
        // Read the reset strategies very well, they differ per platform, see
        // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
        'appium:noReset': false,
        'appium:newCommandTimeout': 240,
    },
];

exports.config = config;
