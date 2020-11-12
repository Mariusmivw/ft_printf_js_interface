const { execSync } = require('child_process');
const path = require('path');

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

function rebuild(conf = {}, opts = {stdio: 'pipe'}) {
	const abolutify = (p)=>path.isAbsolute(p) ? p : path.join(module.parent.path);
	
	const cmd = `cd ${__dirname} && ${conf.headerDir ? `HDIR=${abolutify(conf.headerDir)}` : ''} ${conf.libDir ? `LDIR=${abolutify(conf.libDir)}` : ''} npm run rebuild`;
	try {
		execSync(cmd, {stdio: 'pipe', ...opts});
	} catch (e) {
		console.error('\nRebuilding failed, check if your headerDir and libDir are correct');
		process.exit(1);
	}
}

module.exports = {
	run,
	get printf(){
		return require('./build/Release/addon.node').printf;
	},
	get ft_printf(){
		return require('./build/Release/addon.node').ft_printf;
	},
	rebuild
}