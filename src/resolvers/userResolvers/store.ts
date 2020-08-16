import { UserInputError } from 'apollo-server-express';

import UserEntity from '../../entities/UserEntity';

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
}

export default async function store({
    name,
    email,
    password
}: ICreateUser){
 
    const user = await UserEntity.findOne({ email });

    if(user) throw new UserInputError('e-mail already in use');

    const newUser = UserEntity.create({
        name,
        email,
        password
    });

    return newUser.save()
}