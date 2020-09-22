import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UserInputError } from 'apollo-server-express';

interface ITokenPayload {
    userId: number;
}

const bearerError = 'Not authorized, invalid Bearer Token';

export default function checkHeadersAuthorization(req: Request) {

    const reqAuth = req.headers.authorization;

    if(!reqAuth) throw new UserInputError(bearerError);

    const [bearer, token] = reqAuth.split(' ');

    if(bearer !== 'Bearer') throw new UserInputError(bearerError);
    if(token.length < 100) throw new UserInputError(bearerError);

    try {
        
        const tokenPayload: ITokenPayload = jwt.verify(token, process.env.APP_SECRET as string) as ITokenPayload;
    
        return tokenPayload;

    } catch (error) {
        throw new UserInputError(bearerError);
    }
}