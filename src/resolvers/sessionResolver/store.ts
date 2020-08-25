import { UserInputError } from 'apollo-server-express';

import UserEntity from '../../entities/UserEntity';

export interface ISession {
    email: string;
    password: string;
}

export default async function store({
    email,
    password
 }: ISession){

    const user = await UserEntity.findOne({ email });

    if(!user) throw new UserInputError('User not found');

    if(! await user.checkPassword(password)) throw new UserInputError('Password do not match');

    return user.generateJwt();
 }
