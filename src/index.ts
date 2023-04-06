import process from 'node:process';
import cluster from 'node:cluster';
// import physicalCpuCount from 'physical-cpu-count';
import { scopedLogger } from './lib/logger.js';
import { createServer } from './lib/server.js';

const logger = scopedLogger('index');
const port = process.env['PORT'] ?? 3000;

const workerFn = async () => {
	const server = await createServer();

	server.listen(port, () => {
		logger.info(`application started on port ${port}`);
	});
};

if (cluster.isPrimary) {
	logger.info(`Master ${process.pid} is running with ${2} workers`);

	for (let i = 0; i < 2; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker) => {
		logger.error(`worker ${worker.process.pid!} died`);
		cluster.fork();
	});
} else {
	logger.info(`Worker ${process.pid} is running`);

	workerFn().catch((error) => {
		logger.error('failed to start cluster', error);
	});
}
