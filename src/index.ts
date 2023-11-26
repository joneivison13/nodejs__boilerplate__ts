import cluster from "cluster";
import { app } from "./app";
import logger from "./utils/logger";

let isShuttingDown = false;

const numCPUs = +(process.env.APP_CLUSTERS || 1) || 1;

const startWorker = () => {
  const worker = cluster.fork();

  worker.on("exit", (code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      logger.error(`Worker ${worker.process.pid} died`);
      cluster.fork();
    }
  });
};

const gracefulShutdown = () => {
  if (isShuttingDown) return;

  isShuttingDown = true;
  logger.info("Received SIGTERM. Starting graceful shutdown...");

  // Impede a criação de novos trabalhadores
  cluster.removeAllListeners("exit");

  // Desliga todos os trabalhadores graciosamente
  for (const id in cluster.workers) {
    if (cluster.workers.hasOwnProperty(id)) {
      cluster.workers[id]?.send({ cmd: "shutdown" });
    }
  }
};

if (cluster.isPrimary) {
  logger.info(`Master process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    startWorker();
  }

  cluster.on("exit", (worker, code, signal) => {
    if (code === 0) {
      logger.info(`Worker ${worker.process.pid} has gracefully exited`);
    } else {
      logger.error(`Worker ${worker.process.pid} has died`);
    }

    if (!worker.exitedAfterDisconnect) {
      startWorker();
    }
  });

  process.on("SIGTERM", gracefulShutdown);
} else {
  const server = app.listen(process.env.PORT || 3333, () => {
    logger.info(
      `Worker ${process.pid} started. Server is running on port ${
        process.env.PORT || 3333
      }`
    );
  });

  process.on("message", (message: any) => {
    if (message.cmd === "shutdown") {
      // Lida com o comando de desligamento do cluster principal
      logger.info(`Worker ${process.pid} is shutting down gracefully...`);

      // Encerre o servidor Express graciosamente
      server.close(() => {
        logger.info(`Worker ${process.pid} has closed its server.`);
        process.exit(0);
      });
    }
  });
}
