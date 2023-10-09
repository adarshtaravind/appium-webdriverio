'use strict';
// alias paths don't work here
let cliArguments = [
	{
		keyName: 'documentation',
		shortKeyName: 'doc',
		description: 'print documentation for the task',
		defaultValue: '',
	},
	{
		keyName: 'product',
		shortKeyName: 'pd',
		description: 'zipari product (bp, mp, ps etc)',
		defaultValue: 'member_portal_v3',
	},
	{
		keyName: 'tenant',
		shortKeyName: 'tn',
		description: 'runs tests against specified tenants instance',
		defaultValue: 'fallonhealth',
	},
	{
		keyName: 'env',
		shortKeyName: 'en',
		description: 'environment of the application (dev, uat, prod)',
		defaultValue: 'sit',
	},
	{
		keyName: 'spec',
		shortKeyName: 'sp',
		description: 'single spec path, relative to root folder or test suite (must exist)',
		defaultValue: '',
	},
	{
		keyName: 'other',
		shortKeyName: 'ot',
		description: 'additional information when needed (e.g. quote#)',
		defaultValue: '',
	},
	{
		keyName: 'video',
		shortKeyName: 'vd',
		description: 'Video recording flag (onFailure,full)',
		defaultValue: false,
	},
	{
		keyName: 'debugger',
		shortKeyName: 'dbg',
		description: 'Pass true to call debugger on test failure, Note: Make sure the script is running in debug terminal',
		defaultValue: false,
	},
	{
		keyName: 'savenetwork',
		shortKeyName: 'sn',
		description: 'Pass true to log network requests as network.log under artifacts folder',
		defaultValue: false,
	},
	{
		keyName: 'full',
		shortKeyName: 'fl',
		description: 'iterates tests against every record in data sheet',
		defaultValue: false,
	},
	{
		keyName: 'appUrl',
		shortKeyName: 'url',
		description: 'App url to download the .app/.apk file(Direct download link)',
		defaultValue: '',
	},
	{
		keyName: 'platform',
		shortKeyName: 'os',
		description: 'OS to run the tests (android,android-bs,ios,ios-bs) , -bs for BrowserStack',
		defaultValue: 'android',
	},
	{
		keyName: 'reportPortal',
		shortKeyName: 'rp',
		description: 'Pass true to connect with report-portal',
		defaultValue: false,
	},
];
let directoryMapping = {
		member_portal_v3: {
			brandhealth: 'tests/custom-code-apps/brandhealth/member_portal_v3',
			fallonhealth: 'tests/custom-code-apps/fallonhealth/member-portal-v3',
		},
	},
	getParams = grunt => {
		let products = [
				{
					fullName: 'member_portal_v3',
					spelling: ['mpv3', 'member_portal_v3', 'member portal v3', 'memberportalv3', 'member-portal-v3'],
				},
			],
			tenants = [
				{
					fullName: 'fallonhealth',
					spelling: ['fallon', 'fallonhealth'],
				},
				{
					fullName: 'brandhealth',
					spelling: ['bh', 'brandhealth', 'brand health', 'brand_health'],
				},
				
				
			],
			getValue = arg => {
				let currentValue = grunt.option(arg.keyName) || grunt.option(arg.shortKeyName);
				return currentValue !== undefined
					? currentValue
						? typeof currentValue === 'string'
							? currentValue.toLowerCase()
							: currentValue
						: '' // for boolean values
					: arg.defaultValue;
			},
			validateParams = params => {
				// get tenant name in the appropriate format
				let tenant = tenants.find(item => item.spelling.includes(params.tenant));
				if (!tenant) throw new Error("Couldn't find tenant by provided name");
				params.tenant = tenant.fullName;

				// get product name in the appropriate format
				let product = products.find(item => item.spelling.includes(params.product));
				if (!product) throw new Error("Couldn't find product by provided name");
				params.product = product.fullName;

				// get directoryMapping and assign it to parameter obj
				if (!directoryMapping.hasOwnProperty(params.product) || !directoryMapping[params.product].hasOwnProperty(params.tenant))
					throw new Error(`directoryMapping doesn't have information for '${params.product}' product & '${params.tenant}' tenant`);
				params.directoryMapping = directoryMapping[params.product][params.tenant];
				params.configMapping = `${params.directoryMapping}/device-configuration/index.json`;
				params.appUrl = grunt.option('url'); // setting exact url
				return params;
			};

		let parameters = {};
		for (let arg of cliArguments) {
			parameters[arg.keyName] = getValue(arg);
		}

		parameters = validateParams(parameters);
		return parameters;
	};

module.exports = grunt => {
	// register a task for ui tests
	grunt.registerTask('wdio', 'task for wdio process', function() {
		const done = this.async();

		const Launcher = require('@wdio/cli').default;
		let wdio;
		let parameters = getParams(grunt);
		switch (parameters.platform) {
			case 'android':
				wdio = new Launcher('config/wdio-android-app.conf.js');
				break;
			case 'ios':
				wdio = new Launcher('config/wdio-ios-app.conf.js');
				break;
			case 'android-bs':
				wdio = new Launcher('config/browserstack/wdio-bs.conf.js');
				break;
			case 'ios-bs':
				wdio = new Launcher('config/browserstack/wdio-bs.conf.js');
				break;
			default:
				throw new Error(`Platform ${parameters.platform} is not supported`);
		}

		return wdio.run().then(
			code => {
				grunt.log.debug(`wdio testrunner finished with exit code ${code}`);
				return done(code === 0);
			},
			e => {
				grunt.log.error(`Something went wrong running wdio: ${e}`);
				return done(false);
			}
		);
	});

	grunt.registerTask('generate', 'generates tmp files', function() {
		// assign parameters for execution
		let parameters = getParams(grunt);

		grunt.file.write('tests/.artifacts/parameters.json', JSON.stringify(parameters, undefined, 2));
	});

	grunt.registerTask('clean', 'clean tmp folder', function() {
		grunt.file.delete('tests/.artifacts');
	});

	grunt.registerTask('e2e', 'task for running tests', function() {
		// print documentation
		if (grunt.option('documentation') || grunt.option('doc')) {
			let form = [
				'',
				'                                *** DOCUMENTATION FOR GRUNT TASK: ***',
				'',
				'   PARAMETER   |SHORT|                          DESCRIPTION                                            |      DEFAULT ',
				'--------------------------------------------------------------------------------------------------------------',
				'${placeholder}',
				'==============================================================================================================',
			];
			let argsDescription = cliArguments.map(arg => `-${arg.keyName.padEnd(14, ' ')}| -${arg.shortKeyName.padEnd(3, ' ')}| ${arg.description.padEnd(80, ' ')}| ${arg.defaultValue}`);
			form.splice(form.indexOf('${placeholder}'), 1, ...argsDescription);
			for (let line of form) {
				// apply yellow color, print line, reset color
				console.log('\x1b[33m', line, '\x1b[0m');
			}
			return;
		}
		grunt.task.run(['clean:artifacts', 'generate', 'wdio']);
	});

	// assign e2e to default task
	grunt.registerTask('default', ['e2e']);
};
