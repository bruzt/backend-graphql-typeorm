import { UserInputError } from 'apollo-server-express';

import UserEntity from '../../entities/UserEntity';
import { ICreateUser } from './store';

export interface IUpdateUser extends ICreateUser {
    id: number;
}

export default async function update({
    id,
    name,
    email,
    password
}: IUpdateUser){

    const user = await UserEntity.findOne({ id });

    if(!user) throw new UserInputError('User not found');

    if(name) user.name = name;
    if(email) user.email = email;
    if(password) user.password = password;

    return user.save();
}