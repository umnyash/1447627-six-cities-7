import { MongoConnectionOptions } from '../types/mongo-connection-options-type.js';

export function getMongoURI(options: MongoConnectionOptions): string {
  const { username, password, host, port, databaseName } = options;

  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
}
