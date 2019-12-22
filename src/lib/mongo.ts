import { MongoClientOptions, MongoClient, MongoError, MongoCallback, Db } from "mongodb";
import { rejects } from "assert";

export default class MongoDbConnection {
  datasource: Object | any;
  constructor() {
    this.datasource = {}
  }
  public async init(configs: any[]): Promise<void> {
    const client = await this.connect(configs[0].connectionString, configs[0].options);
    const database = await client.db(configs[0].dbName);
    this.clientListeners(client, database);
    this.datasource[configs[0].dbName] = { config: configs[0], client, database }
  }

  public async connect(connectionURI: string, options: any): Promise<MongoClient> {
    return new Promise((reject, resolve) => {
      MongoClient.connect(connectionURI, options, (err: MongoError, dbResponse: MongoClient) => {
        if (err) {
          console.log(`mongodb error ${err}`)
        }
        resolve(dbResponse)
      })
    })
  }

  /**
  *
  *
  * @param {string} connectionName
  * @returns {Promise<void>}
  * @memberof Mongo
  */
  public async verifyConnection(connectionName: string): Promise<void> {
    try {
      const mongoDatasource = this.datasource[connectionName];
      if (!mongoDatasource.isConnected) {
        await this.connect(
          mongoDatasource.config.connectionString, mongoDatasource.config
        );
        console.log("not connected...")
      }
      return;
    } catch (err) {
      throw err;
    }
  }

  // TODO: fill in Mongo.getConnection information
  /**
   *
   *
   * @param {string} connectionName
   * @returns {Promise<Db>}
   * @memberof Mongo
   */
  public async getConnection(connectionName: string): Promise<Db> {
    
    console.log("connectionName..", connectionName);
    await this.verifyConnection(connectionName);
    console.log(this.datasource[connectionName].database)
    return this.datasource[connectionName].database;
  }

  public clientListeners(cl: any, db: any) {
    cl.on('connected', () => console.log(`${db} connected`));
    cl.on('error', () => console.log(`${db} error`));
    cl.on('disconnected', () => console.log(`${db} disconnected`))
  }
}
