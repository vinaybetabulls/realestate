import { MongoClient, MongoError } from "mongodb";

export default class AuthModel {
    public static async login(payload: any) {
        const login = () => {
            return new Promise((resolve, reject) => {
                MongoClient.connect(
                    "mongodb://localhost:27017/",
                    async (err: MongoError, result: MongoClient) => {
                        const db = result.db("realestate");
                        return resolve(db.collection("agent").findOne(
                            {
                                $and: [
                                    { agentEmail: payload.username },
                                    { agentPassword: payload.password },
                                    { role: payload.role }
                                ]
                            }
                        ));
                    })
            })
        }
        return await login()
    }
}