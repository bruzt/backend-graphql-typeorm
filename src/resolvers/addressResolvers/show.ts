import { Request } from 'express';

import AddressEntity from '../../entities/AddressEntity';
import checkHeadersAuthorization from '../../utils/checkHeadersAuthorization';

export default function show(context: { req: Request }){

    const tokenPayload = checkHeadersAuthorization(context.req);

    return AddressEntity.findOne({ id: tokenPayload.userId }, {
        relations: [
            'user', 
            'user.address',
            'user.phones',
            'user.usersProjects'
        ]
    });
}
