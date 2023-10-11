const { config } = require('../wdio-shared.conf');

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        // Set your BrowserStack config
        'browserstack.debug': true,

        // Set URL of the application under test
        'app': 'bs://d5b4483e13f84166d3fa2f33868e893e2914df40',

        // Specify device and os_version for testing
        'device': 'Google Pixel 3',
        'os_version': '10.0',

        // Set other BrowserStack capabilities
        'project': 'adarsh_aravind_personal',
        'build': 'android',
        'name': 'adarsh_aravind_personal',
        'noReset': 'true'
    },
];

// =============================
// Browserstack specific config
// =============================
// User configuration
config.user = process.env.BROWSERSTACK_USER || 'adarsharavind_PImliv';
config.key = process.env.BROWSERSTACK_ACCESS_KEY || 'ipJ3fJoqRYHJKM9pSgPy';
// Use browserstack service
config.services = ['browserstack'];

// This port was defined in the `wdio.shared.conf.js`
delete config.port;

exports.config = config;
