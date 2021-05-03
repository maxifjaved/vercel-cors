const moduleAlias = require('module-alias');
const http = require('http');
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

moduleAlias.addAlias('@', () => __dirname);


let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
	res.end(`<h1 style="text-align: center">&#128640; &#128640; &#128640; Vercel CORS Server start! Cheers! &#128640; &#128640; &#128640;</h1>`);
});

app.use(express.static(path.join(__dirname, '..', 'public')));


module.exports = app;

// // Catch unhandled rejections
// process.on('unhandledRejection', (err) => {
// 	console.error('Unhandled rejection', err);
// 	process.exit(1);
// });
//
// // Catch uncaught exceptions
// process.on('uncaughtException', (err) => {
// 	console.error('Uncaught exception', err);
// 	process.exit(1);
// });
