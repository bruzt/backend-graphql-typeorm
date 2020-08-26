import { Request } from 'express';

import { UserInputError } from 'apollo-server-express';
import checkHeadersAuthorization from '../../utils/checkHeadersAuthorization';
import UserEntity from '../../entities/UserEntity';

export default async function destroy(id: number, context: { req: Request }){

    const tokenPayload = checkHeadersAuthorization(context.req);

    const user = await UserEntity.findOne({ id: tokenPayload.userId }, {
        relations: ['phones']
    });

    if(!user) throw new UserInputError('User not found');

    const phone = user.phones?.filter( (phone) => phone.id == id);

    if(!phone || phone.length == 0) throw new UserInputError('Phone not found');

    await phone[0].remove();

    return true;
}
