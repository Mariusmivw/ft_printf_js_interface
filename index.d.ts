type type_value_pair =
	| ['char *', String]
	| ['char', String]
	| ['NULL', 0]
	| ['double', Number]
	| ['long long', Number]
	| ['unsigned long long', Number];

type print_function = (format: String, ...args: type_value_pair[]) => [print_value: String, return_value: Number]

type execSyncOptions = {};

/**
 * Runs a printing function
 * @param print_fn A printing function (printf / ft_printf)
 * @param print_args Arguments to the print function, written as it would be in C, but all in a single enclosing string
 */
export function run(
	print_fn: print_function,
	print_args: String = `"05.2%s", "hello"`
): [print_value: String, return_value: Number];

/**
 * If you rebuild the interface, make sure you load this function AFTER that has completed
 */
export function printf(format: String, ...args: type_value_pair[]): [print_value: String, return_value: Number];

/**
 * If you rebuild the interface, make sure you load this function AFTER that has completed
 */
export function ft_printf(format: String, ...args: type_value_pair[]): [print_value: String, return_value: Number];

/**
 * Rebuild the interface between JS and C, useful if your library has changed
 * @param conf Configuration options for rebuilding
 * @param opts Opts to pass along to execSync (defaults: {stdio: 'pipe'})
 */
export function rebuild(conf:{headerDir?:String,libDir?:String} = {}, opts:execSyncOptions = {stdio: 'pipe'}): void;
