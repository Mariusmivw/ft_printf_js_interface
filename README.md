# ft_printf JS interface

## Installation

Create a Node.js project and install the package
```bash
npm init -y
npm i https://github.com/Mariusmivw/ft_printf_js_interface.git
```

## Usage

```js
const { rebuild } = require('ft_printf_js_interface');

rebuild({ headerDir: './someDir', libDir: './someDir' }); // Useful if there are any changes to ft_printf

const { run, ft_printf, printf } = require('ft_printf_js_interface'); // Make sure you use the value of ft_printf and printf only AFTER you have rebuilt (otherwise you'll have to run the script again)

const [printed, len] = run(printf, `"Hello %s\n", "world"`); // Note: the second argument is like you'd write it in C
const [printed2, len2] = run(ft_printf, `"This uses ft_printf instead of printf\n"`);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)