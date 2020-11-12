const {ft_printf, printf, run} = require('./index');
const len = run(ft_printf, `"|Hello %i|\n", 12`);
const len2 = run(printf, `"|Hello %i|\n", 12`);
console.log(len, len2)