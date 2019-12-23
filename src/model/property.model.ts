import { MongoClient, MongoError } from "mongodb";
export default class PropertyModel {
  public static async saveProperty(property: any) {
    MongoClient.connect(
      "mongodb://localhost:27017/",
      async (err: MongoError, result: MongoClient) => {
        const db = result.db("realestate");
        let dbrespose = await db.collection("property").insert(property);
        return dbrespose;
      }
    );
  }

  public static async getPrperties() {

   return MongoClient.connect(
        "mongodb://localhost:27017/",
        async (err: MongoError, result: MongoClient) => {
          const db = result.db("realestate");
          let dbrespose = await db.collection("property").find({}).toArray();
          return dbrespose;
        }
      );
  }
}
