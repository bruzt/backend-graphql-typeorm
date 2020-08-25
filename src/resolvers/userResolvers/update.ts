import { UserInputError } from 'apollo-server-express';
import { Request } from 'express';

import UserEntity from '../../entities/UserEntity';
import checkHeadersAuthorization from '../../utils/checkHeadersAuthorization';

export interface IUpdateUser {
    name?: string;
    email?: string;
    password?: string;
}

export default async function update(
    args: IUpdateUser,
    context: { req: Request; }
){

    const tokenPayload = checkHeadersAuthorization(context.req);

    const { name, email, password } = args;
    
    const user = await UserEntity.findOne({ id: tokenPayload.userId });

    if(!user) throw new UserInputError('User not found');

    if(name) user.name = name;
    if(email) user.email = email;
    if(password) user.password = password;

    return user.save();
}