function run(print_fn, print_args=`"05.2%s", "hello"`){
	args = print_args.split(',').map((v, i, arr)=>{
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
const {printf, ft_printf} = require('./build/Release/addon.node');
module.exports = {
	run,
	printf,
	ft_printf
}