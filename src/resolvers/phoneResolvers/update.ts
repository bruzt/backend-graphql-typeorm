import { UserInputError } from 'apollo-server-express';
import { Request } from 'express';

import checkHeadersAuthorization from '../../utils/checkHeadersAuthorization';
import UserEntity from '../../entities/UserEntity';

export interface IUpdatePhone {
    id: number;
    newPhone: string;
}

export default async function update(args: IUpdatePhone, context: { req: Request; }){

    const tokenPayload = checkHeadersAuthorization(context.req);

    const {
        id,
        newPhone
    } = args;

    const user = await UserEntity.findOne({ id: tokenPayload.userId }, {
        relations: ['phones']
    });

    if(!user) throw new UserInputError('User not found');

    const phone = user.phones?.filter( (phone) => phone.id == id);

    if(!phone || phone.length == 0) throw new UserInputError('Phone not found');

    phone[0].phone = newPhone;

    return phone[0].save();
}
