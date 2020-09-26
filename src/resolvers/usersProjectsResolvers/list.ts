import { Request } from 'express';

import UsersProjectsEntity from '../../entities/UsersProjectsEntity';
import checkHeadersAuthorization from '../../utils/checkHeadersAuthorization';

export default async function list(context: { req: Request; }){

    const tokenPayload = checkHeadersAuthorization(context.req);

    return UsersProjectsEntity.find({ 
        where: {
            userId: tokenPayload.userId,
        },
        relations: ['project']
    });
}
