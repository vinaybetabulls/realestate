
import AuthService from '../services/auth.service';

module.exports.login = (req: any, res: any) => {
    try {
        console.log("jsaglksdgl")
        AuthService.login(req, res)
    } catch (error) {
        console.log(error)
    }
}