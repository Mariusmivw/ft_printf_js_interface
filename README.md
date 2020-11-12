# ft_printf JS interface

## Installation

Clone the repository somewhere
```bash
git clone https://github.com/Mariusmivw/ft_printf_js_interface.git
```
Create a Node.js project and import the package
```bash
npm init -y
npm i (folder where you cloned the repo) # e.g.: npm i ../ft_printf_js_interface
```

## Usage

If the default settings in config.js aren't correct make sure you change them accordingly.
Afterward do `npm run rebuild`

```js
const { rebuild } = require('ft_printf_js_interface');

rebuild({ headerDir: './someDir', libDir: './someDir' }); // use this to rebuild the interface, might be used if there are changes in your ft_printf. Possible options after 1st argument: same as options for execSync (https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options)

const { run, ft_printf, printf } = require('ft_printf_js_interface');

const len = run(printf, `"Hello %s\n", "world"`); // Note: the second argument is like you'd write it in C
const len2 = run(ft_printf, `"This uses ft_printf instead of printf\n"`);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)