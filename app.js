var app = require('connect')()
var serveStatic = require('serve-static')
const gulp = require("gulp");

app.use(serveStatic('public'))
app.use(gulp)

console.log(' ➜   Open: http://localhost:7007')
app.listen(7007)
