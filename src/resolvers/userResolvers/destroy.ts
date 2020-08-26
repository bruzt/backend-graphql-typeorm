import { UserInputError } from 'apollo-server-express';
import { Request } from 'express';

import UserEntity from '../../entities/UserEntity';
import checkHeadersAuthorization from '../../utils/checkHeadersAuthorization';

export default async function destroy(context: { req: Request; }){

    const tokenPayload = checkHeadersAuthorization(context.req);

    const user = await UserEntity.findOne({ id: tokenPayload.userId });

    if(!user) throw new UserInputError('User not found');

    await user.softRemove();

    return true;
}
