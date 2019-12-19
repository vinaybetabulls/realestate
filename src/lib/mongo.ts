import { MongoClientOptions, MongoClient, MongoError, MongoCallback } from "mongodb";
import { rejects } from "assert";

export default class MongoDbConnection {
  datasource: Object | any;
  constructor() {
    this.datasource = {};
  }
  public async init(configs: any[]): Promise<void> {
    const client = await this.connect(configs[0].connectionString, configs[0].options);
    const database = await client.db(configs[0].dbName);
    this.clientListeners(client, database);
    this.datasource[configs[0].dbName] = {client, database, config: configs[0], connectionInitTime: new Date()}
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

  public async getConnection() {
    //
  }

  public clientListeners(cl: any, db: any) {
    cl.on('connect', () => console.log(`${db} connected`));
    cl.on('error', () => console.log(`${db} error`));
    cl.on('disconnected', () => console.log(`${db} disconnected`))
  }
}
