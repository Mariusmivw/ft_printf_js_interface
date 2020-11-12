{
    "targets": [
        {
            "target_name": "addon",
            "sources": ["addon.cpp"],

            "include_dirs": [
				"<!@(node -p \"require('./config.js').getConfig('<(module_root_dir)', 'headerDir')\")",
                "<!@(node -p \"require('node-addon-api').include\")",
            ],
            "libraries": [
				"-L<!@(node -p \"require('./config.js').getConfig('<(module_root_dir)', 'libDir')\")",
				"-lftprintf",
			],

            "cflags!": ["-fno-exceptions"],
            "cflags_cc!": ["-fno-exceptions"],
            "xcode_settings": {"GCC_ENABLE_CPP_EXCEPTIONS": "YES",
                               "CLANG_CXX_LIBRARY": "libc++",
                               "MACOSX_DEPLOYMENT_TARGET": "10.7",
                               },
            "msvs_settings": {
                "VCCLCompilerTool": {"ExceptionHandling": 1},
            },
        }
    ],
}
