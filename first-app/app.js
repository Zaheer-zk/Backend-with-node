console.log('Hello world!');
const os = require('os');
console.log('Total memory : ', os.totalmem());
console.log('Free memory : ', os.freemem());
console.log('Total cpus : ', os.cpus().length);

const fs = require('fs');
const totalFiles = fs.readdirSync('./');
console.log(totalFiles); // [ 'app.js' ]

fs.readdir('./', function (err, files) {
  if (err) console.error(err);
  else console.log(files); // [ 'app.js' ]
});
