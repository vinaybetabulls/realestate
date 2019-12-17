import { MongoClient, MongoError } from "mongodb";
export default class MongoDbConnection {
  public async init(url: string, dbname: string) {
    MongoClient.connect(url, (err: MongoError, client: MongoClient) => {
      const database = client.db(dbname);
      console.log(database.databaseName)
      return database;
    });
  }
}
