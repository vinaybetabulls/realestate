import * as jsonwebtoken from 'jsonwebtoken';
import { rejects } from 'assert';
import { decode } from 'querystring';

export default class JWT {
    public _jwt: any = jsonwebtoken;

    public static async verify(token: string): Promise<any> {
        try {
            const _verify = (jwt: any, token: string) => {
                return new Promise((resolve, reject) => {
                    jwt.verify(token, process.env.SECRETE_KEY, (error: any, decode: any) => {
                        console.log(decode)
                        return resolve(decode)
                    })
                })
            }
            let result = await _verify(jsonwebtoken, token);
            console.log(result)
            return result
        } catch (error) {
            throw error
        }
    }

    async authenticate(token: any) {
        try {
            const decodeToken = await JWT.verify(token);
            return decodeToken;
        } catch (error) {
            throw error
        }
    }

    public static async generateJWTToken(payload: any) {
        console.log("payload=======", payload)
         let secreteKey = process.env.SECRETE_KEY || '' ;
         console.log(secreteKey)
        return await jsonwebtoken.sign(payload, secreteKey, { expiresIn: '1h' })
    }
}