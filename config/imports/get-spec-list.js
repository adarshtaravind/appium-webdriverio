const path = require('path');
const fs = require('fs');
const params = require('../../tests/.artifacts/parameters.json');
module.exports = (spec, directory) => {
	let specs;
	if (spec === '') {
		// default: all specs if no params  specified
		if (params.platform.includes('android')) {
			specs = path.resolve(directory, 'specs', 'android', '**', '*spec.js');
		} else {
			specs = path.resolve(directory, 'specs', 'ios', '**', '*spec.js');
		}
	} else if (spec === path.basename(spec)) {
		// test suite specified
		let suite = path.resolve(directory, 'test-suites', `${spec}.json`);
		if (!fs.existsSync(suite)) {
			throw new Error(`The specified test suite doesn't exist: ${suite}`);
		}

		specs = require(suite);
		if (Array.isArray(specs)) {
			specs = specs.map(specPath => path.resolve(directory, 'specs', specPath));
		} else {
			throw new Error(`${spec} test suite should be a valid array`);
		}
	} else if (spec !== path.basename(spec)) {
		// custom spec file
		specs = path.join(process.cwd(), spec);
		if (!fs.existsSync(specs)) {
			throw new Error(`The specified spec doesnt exist: ${specs}`);
		}
	} else {
		throw new Error('Unexpected error in get-spec-list.js');
	}

	console.log('getSpecList: running specs ' + JSON.stringify(specs));
	return specs;
};
