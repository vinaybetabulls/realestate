import { MongoClient, MongoError } from "mongodb";

export default class AgentModel {
  public static async addAgent(agent: any) {
      console.log("add agent")
    const addAgent = () => {
      return new Promise((resolve, reject) => {
          console.log(agent)
        MongoClient.connect(
          "mongodb://localhost:27017/",
          async (err: MongoError, result: MongoClient) => {
            const db = result.db("realestate");
            resolve(await db.collection("agent").insertOne(agent));
          }
        );
      });
    };

    return await addAgent();
  }
}
