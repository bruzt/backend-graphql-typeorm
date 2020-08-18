import { UserInputError } from 'apollo-server-express';

import AddressEntity from '../../entities/AddressEntity';
import UserEntity from '../../entities/UserEntity';

export interface IStoreAddress {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    uf: string;
    zipcode: string;
    userId: number;
}

export default async function store({ 
    street,
    number,
    neighborhood,
    city,
    uf,
    zipcode,
    userId,
}: IStoreAddress){

    const user = await UserEntity.findOne({ id: userId }, { relations: ['address'] });

    if(!user) throw new UserInputError('User not found');
    if(user.address && Object.keys(user.address).length > 0) {

        const oldAddress = await AddressEntity.findOne({ id: user.address.id });

        await oldAddress?.remove();
    }

    const newAddress = AddressEntity.create({
        street,
        number,
        neighborhood,
        city,
        uf,
        zipcode,
        user,
    });

    return newAddress.save();
}