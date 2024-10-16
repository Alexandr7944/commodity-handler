import {NextFunction, Request, Response} from "express";
import {Credential} from "@/models";

class Auth {
    static async checkAuth(req: Request, res: Response, next: NextFunction) {
        const errorAuth = () => res.status(201).json([]);
        const {authorization, referer} = req.headers;

        if (!authorization || !process.env.REF || !referer?.includes(process.env.REF))
            return errorAuth();

        const [type, token] = authorization.split(' ');
        if (type !== 'Basic')
            return errorAuth();

        if (!token)
            return errorAuth();
        const tokenDecoded = atob(token);
        req.body ||= {};
        req.body.user = await Credential.findOne({where: {token: tokenDecoded}});

        if (!req.body.user)
            return errorAuth();

        next();
    }
}

export default Auth;
