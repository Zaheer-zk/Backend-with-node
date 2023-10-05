const fs = require('fs');

fs.writeFileSync('./text.txt', 'Hello, world!');
fs.writeFile('./text.txt', 'Hello, world!', (err) => {});
const result = fs.readFileSync('./text.txt', 'utf-8');
console.log(result);
fs.appendFileSync('./text.txt', 'Hello, world!...\n');
