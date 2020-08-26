import { UserInputError } from 'apollo-server-express';
import { Request } from 'express';

import checkHeadersAuthorization from '../../utils/checkHeadersAuthorization';
import UserEntity from '../../entities/UserEntity';

export default async function destroy(context: { req: Request; }){

    const tokenPayload = checkHeadersAuthorization(context.req);

    const user = await UserEntity.findOne({ id: tokenPayload.userId }, {
        relations: ['address']
    })

    if(!user) throw new UserInputError('User not found');
    if(!user.address) throw new UserInputError('Address not found');

    await user.address.remove();

    return true;
}
