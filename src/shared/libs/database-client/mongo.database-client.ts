import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';

import { DatabaseClient } from './database-client.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../logger/index.js';
import { getErrorMessage } from '../../helpers/index.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private RETRY_COUNT = 5;
  private RETRY_TIMEOUT = 1000;
  private mongoose: typeof Mongoose;
  private isConnected = false;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) { }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      this.logger.info('MongoDB client already connected.');
      return;
    }

    this.logger.info('Trying to connect to MongoDB…');

    let attempt = 0;

    while (attempt < this.RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`, error as Error);
        console.error(getErrorMessage(error));
        await setTimeout(this.RETRY_TIMEOUT);
      }
    }

    throw new Error(`Unable to establish database connection after ${this.RETRY_COUNT}`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      this.logger.info('Not connected to the database.');
      return;
    }

    await this.mongoose.disconnect();
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
