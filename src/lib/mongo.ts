import { MongoClientOptions, MongoClient, MongoError, MongoCallback } from "mongodb";
import { rejects } from "assert";

export default class MongoDbConnection {
  public async init(configs: any[]): Promise<void> {

    c = configs;
    const client = await this.connect(configs[0].connectionString, configs[0].options);
    const database = await client.db(configs[0].dbName);
    this.clientListeners(client, database);
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
    //todo
  }

  public clientListeners(cl: any, db: any) {
    cl.on('connected', () => console.log(`${db} connected`));
    cl.on('error', () => console.log(`${db} error`));
    cl.on('disconnected', () => console.log(`${db} disconnected`))
  }
}
