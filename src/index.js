const moduleAlias = require('module-alias');
moduleAlias.addAlias('@', () => __dirname);

const config = require('./config').value;
const fs = require('fs');
const corsProxy = require('cors-anywhere');
const enableCluster = false;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const app = corsProxy.createServer({
	originWhitelist: [], // Allow all origins
	requireHeader: ['origin', 'x-requested-with'],
	removeHeaders: ['cookie', 'cookie2']
});

if (enableCluster && cluster.isMaster && process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'dev') {
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
} else {
	if (config.connect.port) {
		app.listen(config.connect.port, parseInt(config.listenInaddrAny) ? null : '127.0.0.1');
		console.info('Listening Port ' + config.connect.port);
	}

	module.exports = app;
}




