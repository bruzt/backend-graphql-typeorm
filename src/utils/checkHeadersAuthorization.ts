import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UserInputError } from 'apollo-server-express';

interface ITokenPayload {
    userId: number;
}

export default function checkHeadersAuthorization(req: Request) {

    const reqAuth = req.headers.authorization;

    if(!reqAuth) throw new UserInputError('Not authorized');

    const [bearer, token] = reqAuth.split(' ');

    if(bearer !== 'Bearer') throw new UserInputError('Not authorized');
    if(token.length < 100) throw new UserInputError('Not authorized');

    try {
        
        const tokenPayload: ITokenPayload = jwt.verify(token, process.env.APP_SECRET as string) as ITokenPayload;
    
        return tokenPayload;

    } catch (error) {
        throw new UserInputError('Not authorized');
    }
}