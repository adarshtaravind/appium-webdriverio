# WebDriver IO Appium Automation

This project to run Appium tests together with WebdriverIO for:

-   iOS/Android Native Apps
-   iOS/Android Hybrid Apps

## Based on

This Framework is currently based on:

-   **WebdriverIO:** `7.##.#`
-   **Appium:** `2.#` we are using the beta version of appium 2 while developing this framework.

## Installing Appium on a local machine

See [Installing Appium on a local machine](./docs/APPIUM.md)

## Setting up Android and iOS on a local machine

To setup your local machine to use an Android emulator and an iOS simulator see [Setting up Android and iOS on a local machine](./docs/ANDROID_IOS_SETUP.md)

## Quick start

1. Clone the git repo — `git clone https://gitlab.zipari.net/zta/appium-tests.git`
1. Install the dependencies — `npm install`

## Config

This Framework uses a specific config for iOS and Android, see [configs](tests/config) and are based on `wdio-shared.conf.js`.
This shared config holds all the defaults so the iOS and Android configs only need to hold the capabilities and specs that are needed for running on iOS and or Android (app or browser).

Since we do not have Appium installed as part of this package, this has been configured to use the global Appium installation. This is configured in wdio-shared.conf.js

```
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
                // For arguments see
                // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
                },
                command: 'appium',
            },
        ],
    ],
```

## Locator strategy for native apps

The locator strategy for this boilerplate is to use `accessibilityID`'s, see also the [WebdriverIO docs](http://webdriver.io/guide/usage/selectors.html#Accessibility-ID) or this newsletter on [AppiumPro](https://appiumpro.com/editions/20).
`accessibilityID`'s make it easy to script once and run on iOS and Android because most of the apps already have some `accessibilityID`'s.

## Setting up Node and NPM using NVM

Please make sure to install Node v16 and not the latest version Node v17 as that is not compatible as of now with WebdriverIO & Appium.

We can use the help of NVM to switch between Node versions. Refer [here](https://github.com/nvm-sh/nvm).

## Setting up JAVA_HOME

https://mkyong.com/java/how-to-set-java_home-environment-variable-on-mac-os-x/

# Environment variable

Open the Environment Variable file:
vim ~/.zshenv

# Add the environment variables:

-   export ANDROID_HOME=/Users/username/Library/Android/sdk/
-   export PATH=$ANDROID_HOME/platform-tools:$PATH
-   export PATH=$ANDROID_HOME/tools:$PATH

# Source the changes:

source ~/.zshenv

# Test changes:

echo $ANDROID_HOME
adb devices - should return list of devices attached

-   Note: the same changes can be added to .zshrc or .bashprofile file as well

## Appium selector Guide

-   [WebdriverIO UI Automator Selector](https://webdriver.io/docs/selectors/#android-uiautomator)
-   [Android Developer UI Selector Docs](https://appium.io/docs/en/writing-running-appium/android/uiautomator-uiselector/)
-   [Appium UiSelector Guide](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector)

## Scrolling

UiScrollable is a UiCollection and provides support for searching for items in scrollable layout elements. This class can be used with horizontally or vertically scrollable controls.

[Ui scrollable](https://developer.android.com/reference/androidx/test/uiautomator/UiScrollable)

# Appium Drivers Installation

`appium driver install xcuitest` driver for iOS

`appium driver install uiautomator2` driver for Android

Now to verify if its been installed, you can run - `appium driver list`

# Config files

-   The config files are located in (tests/config) in reference to the root directory.
-   The shared config is for the common configs that are used across the test suites.
-   There are few more configurable configs that are specific to the OS (Android, iOS, BrowserStack).

# Test Execution using grunt

-   grunt task runner is used to execute the test suites. you can pass the desired run parameters in the command line. `grunt` will execute the default task in android.
-   To know about the available grunt parameters, run `grunt -doc`.
-   Run `grunt` to verify tests can be started successfully
    -To see a list of parameters available for the task prepend it with `-doc` flag and run it. For example, `grunt -doc`.

## package.json

3.1. Package.json file:

-   includes general information about project (name, version, contributors)
-   lists the NPM packages the project depends on
-   has list of aliases used (for more info see [Aliases](#aliases))
-   predefined custom command-line scripts

## .gitignore

4.1. .gitignore file lists files that are being ignored by git. This may include IDE related files and configurations, .DS-Store files (MacOS specific files), the folder with dependencies (since they just need to be installed locally) etc.

4.2. .gitignore can be configured by providing rules. Rules may use absolute path, i.e. `/node_modules/` - will ignore node_modules folder located in the root directory. It may use file names - `.DS_Store`. And exceptions of the rules can be specified using exclamation mark

```
/node_modules/
!/node_modules/my-custom-module
```

4.3. Use of comments in .gitignore file is required for explanation of what is being ignored and why. Comment lines start with `#`

# Allure Reporter

-   To run command line application, **_Java Runtime Environment must be
    installed_** in the machine .
-   To view the report after the run simply use `npm run openReport ` in the console .The script added in the package.json will open the HTML report .

## FAQ

See [FAQ](./docs/FAQ.md)

## Tips and Tricks

See [Tips and Tricks](./docs/TIPS_TRICKS.md)
