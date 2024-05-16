const _ = require('underscore');

// flow how require understand the path
// 1 - Core module
// 2 - file or folder
// 3 - checks node_modules

// using 3rd parties library
console.log(_.contains([1, 2, 3], 2));
