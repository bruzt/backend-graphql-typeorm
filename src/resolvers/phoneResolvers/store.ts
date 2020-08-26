import { UserInputError } from 'apollo-server-express';
import { Request } from 'express';

import PhoneEntity from '../../entities/PhoneEntity';
import UserEntity from '../../entities/UserEntity';
import checkHeadersAuthorization from '../../utils/checkHeadersAuthorization';

export interface IStorePhone {
    phone: string;
}

export default async function list(args: IStorePhone, context: { req: Request; }){

    const tokenPayload = checkHeadersAuthorization(context.req)

    const { phone } = args;

    const user = await UserEntity.findOne({ id: tokenPayload.userId });

    if(!user) throw new UserInputError('User not found');

    const newPhone = PhoneEntity.create({
        user,
        phone,
    });
    
    return newPhone.save();
}
