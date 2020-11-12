const path = require('path');

module.exports = {
	headerDir: "../ft_printf",
	libDir: "../ft_printf/bin",
}

module.exports.getConfig = function getConfig(module_path, key) {
	let {headerDir, libDir} = module.exports;
	if (process.env.HDIR)
		headerDir = process.env.HDIR;
	if (process.env.LDIR)
		libDir = process.env.LDIR;
	headerDir = path.isAbsolute(headerDir) ? headerDir : path.join(module_path, headerDir);
	libDir = path.isAbsolute(libDir) ? libDir : path.join(module_path, libDir);
	if (key == 'headerDir')
		return headerDir;
	if (key == 'libDir')
		return libDir;
	return {headerDir, libDir};
}