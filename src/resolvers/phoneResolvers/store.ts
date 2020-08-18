import { UserInputError } from 'apollo-server-express';

import PhoneEntity from '../../entities/PhoneEntity';
import UserEntity from '../../entities/UserEntity';

export interface IStorePhone {
    userId: number;
    phone: string;
}

export default async function list({
    userId,
    phone,
}: IStorePhone){

    const user = await UserEntity.findOne({ id: userId });

    if(!user) throw new UserInputError('User not found');

    const newPhone = PhoneEntity.create({
        user,
        phone,
    });
    
    return newPhone.save();
}
