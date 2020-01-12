import * as _ from 'lodash';
import JWT from '../lib/jwt'


import AuthModel from '../model/auth.model'

export default class AuthService {
    public static async login(req: any, res: any) {
        try {
            const user: any = await AuthModel.login({
                username: _.get(req, 'swagger.params.body.value.agentEmail'),
                password: _.get(req, 'swagger.params.body.value.agentPassword'),
                role: _.get(req, 'swagger.params.body.value.role')
            })
            console.log("aksgklsag", user)
            const token = await JWT.generateJWTToken({
                username: user.agentEmail,
                role: user.role,
                agentId: user.agentId
            })
            res.send(token);
        } catch (error) {
            
        }
    }
}