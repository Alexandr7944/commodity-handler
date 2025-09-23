import {NextFunction, Request, Response} from "express";
import {Credential} from "@/db/Database";

class Auth {
    static async checkAuth(req: Request, res: Response, next: NextFunction) {
        const {authorization} = req.headers;
        if (!authorization)
            return Auth.errorAuth(res);

        const [type, token] = authorization.split(' ');
        if (type !== 'Basic')
            return Auth.errorAuth(res);

        if (!token)
            return Auth.errorAuth(res);
        const tokenDecoded = atob(token);
        req.body ||= {};
        req.body.user = await Credential.findOne({where: {token: tokenDecoded}});

        if (!req.body.user)
            return Auth.errorAuth(res);

        next();
    }

    static checkSheets(req: Request, res: Response, next: NextFunction) {
        const {referer} = req.headers;
        if (process.env.TYPE === 'DEV' || referer?.includes(process.env.REF))
            return next();

        return Auth.errorAuth(res);
    }

    static errorAuth(res: Response) {
        return res.status(201).json([]);
    }
}

export default Auth;
