import { UserInputError } from 'apollo-server-express';

import UserEntity from '../../entities/UserEntity';

export interface IUpdateUser {
    id: number;
    name?: string;
    email?: string;
    password?: string;
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