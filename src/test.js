var fs = require('fs')

var content = fs.readFileSync('./html.txt', 'utf8')

console.log(content)
