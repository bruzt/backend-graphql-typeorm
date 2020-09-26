
import { Request } from 'express';
import UserEntity from '../../entities/UserEntity';

import checkHeadersAuthorization from '../../utils/checkHeadersAuthorization';

export default function show(context: { req: Request; }){

    const tokenPayload = checkHeadersAuthorization(context.req);

    return UserEntity.findOne({ id: tokenPayload.userId });
}
