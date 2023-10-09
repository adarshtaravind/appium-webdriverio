let getSpecList = require('./imports/get-spec-list');
const parameters = require('../tests/.artifacts/parameters.json');
exports.config = {
    // ====================
    // Runner and framework
    // Configuration
    // ====================
    runner: 'local',
	specs: [getSpecList(parameters.spec, parameters.directoryMapping)],
    framework: 'jasmine',
    jasmineNodeOpts: {
        // Updated the timeout to 30 seconds due to possible longer appium calls
        // When using XPATH
        defaultTimeoutInterval: 90000,
        helpers: [require.resolve('@babel/register')],
    },
    jasmineOpts: {
		// Jasmine default timeout
		defaultTimeoutInterval: 60000 * 1,
		//
		// The Jasmine framework allows interception of each assertion in order to log the state of the application
		// or website depending on the result. For example, it is pretty handy to take a screenshot every time
		// an assertion fails.
	},
    sync: true,
    logLevel: 'debug',
    deprecationWarnings: true,
    bail: 0,
    baseUrl: 'http://the-internet.herokuapp.com',
    waitforTimeout: 50000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    reporters: ['spec'],

    // ====================
    // Appium Configuration
    // ====================
    services: [
        [
            'appium',
            {
            // For options see
            // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
                args: {
                    // Auto download ChromeDriver
                    relaxedSecurity: true,
                    // chromedriverAutodownload: true,
                    // For more arguments see
                    // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
                },
                command: 'appium',
            },
        ],
    ],
    port: 4723,
};
