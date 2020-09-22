import { Request } from 'express';

import PhoneEntity from '../../entities/PhoneEntity';
import checkHeadersAuthorization from '../../utils/checkHeadersAuthorization';

export default function list(context: { req: Request }){

    const tokenPayload = checkHeadersAuthorization(context.req);

    return PhoneEntity.find({ userId: tokenPayload.userId });
}
