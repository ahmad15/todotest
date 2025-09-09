const http = require('http');
const path = require('path');
const express = require('express');
const morganBody = require("morgan-body")
const swaggerUi = require('swagger-ui-express');

const { Logger } = require('../helpers');

/**
 * Server
 * @param {object} opts object containing necessary parameters
 * @param {array} opts.initializations array of initializations function, will be run on start
 * @param {object} opts.middlewares object containing list of middlewares
 * @param {array} opts.deinitializations array of deinitialization methods
 */
class Server {
  constructor(opts) {
    Object.assign(this, {
      ...opts
    });
    this.app = express();
    this.app.locals.config = this.config;
    this.logger = Logger(this.config.logger);
    this.app.locals.logger = this.logger;
    this.app.locals.httpRequests = http;

    morganBody(this.app, { stream: { write: (message) => this.logger.info(message.trim()) } });

    if (this.middlewares && this.middlewares.pre && this.middlewares.pre.length) {
      this.middlewares.pre.forEach(middleware => this.app.use(middleware));
    }

    if (this.middlewares && this.middlewares.post && this.middlewares.post.length) {
      this.middlewares.post.forEach(middleware => this.app.use(middleware));
    }

    if (this.docs) {
      this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(this.docs));
    }

    if (this.routes && this.routes.length) {
      this.routes.forEach(route => this.app.use(route));
    }

    this.app.use('/images', express.static('images'));

    this.http = http.createServer(this.app);
  }

  /**
   * set the ms to listen depends on the config given
   * @returns {promise.<object>} return the server itself
   */
  async listen() {
    if (this.initializations && this.initializations.length) {
      try {
        await this.initializations.reduce((p, fn) => p.then(() => fn(this.app)), Promise.resolve());
      } catch (error) {
        this.logger.error({ error }, 'Initializations failed');
        throw error;
      }
    }

    return new Promise((resolve) => {
      const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : this.config.port;
      this.server = this.http.listen(port, () => {
        this.logger.info(`${this.config.name} is listening on ${this.config.host}:${this.config.port}`);
        return resolve();
      });
    });
  }

  /**
   * method to stop the server
   * @param  {string} signal signal given
   */
  async stop(signal) {
    this.logger.info({ event: 'shutdown', signal });
    if (this.deinitializations && this.deinitializations.length) {
      await this.deinitializations.reduce((p, fn) => p.then(async () => {
        try {
          await fn(this.app);
        } catch (error) {
          this.logger.error({ error }, 'Deinitializations failed');
        }
      }), Promise.resolve());
    }
    this.server.close();
    process.exit(0);
  }
}

module.exports = Server;
