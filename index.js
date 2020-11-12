const { execSync } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

let addon = {printf: ()=>{}, ft_printf: ()=>{}};
if (existsSync(path.join(__dirname, './build/Release/addon.node'))) {
	addon = require('./build/Release/addon.node');
}

function run(print_fn, print_args=`"05.2%s", "hello"`) {
	args = print_args.split(',').map((v, i, arr) => {
		v = v.trim();
		if (v[0] == '"')
			return ['char *', v.replace(/^"|"$/g, '')];
		if (v[0] == "'")
			return ['char', v.replace(/^'|'$/g, '')];
		if (v == 'NULL')
			return ['NULL', 0];
		if (v.includes('.'))
			return ['double', parseFloat(v)];
		if (v[0] == '-')
			return ['long long', parseInt(v)];
		return ['unsigned long long', parseInt(v)];
	});
	return print_fn(...args);
}

function rebuild(conf = {}, opts = {stdio: 'inherit'}) {
	opts = {
		stdio: 'inherit',
		...opts
	};

	const abolutify = (p)=>path.isAbsolute(p) ? p : path.join(module.parent.path);
	
	const cmd = `cd ${__dirname} && ${conf.headerDir ? `HDIR=${abolutify(conf.headerDir)}` : ''} ${conf.libDir ? `LDIR=${abolutify(conf.libDir)}` : ''} npm run rebuild`;
	console.log(cmd);
	try {
		execSync(cmd, {stdio: 'inherit', ...opts});
	} catch (e) {
		console.error('\nRebuilding failed, check if your headerDir and libDir are correct');
		process.exit(1);
	}
	addon = require('./build/Release/addon.node');
	module.exports.printf = addon.printf;
	module.exports.ft_printf = addon.ft_printf;
}

module.exports = {
	run,
	...addon,
	rebuild
}