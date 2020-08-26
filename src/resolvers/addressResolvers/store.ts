import { UserInputError } from 'apollo-server-express';
import { Request } from 'express';

import AddressEntity from '../../entities/AddressEntity';
import UserEntity from '../../entities/UserEntity';
import checkHeadersAuthorization from '../../utils/checkHeadersAuthorization';

export interface IStoreAddress {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    uf: string;
    zipcode: string;
}

export default async function store(args: IStoreAddress, context: { req: Request; }){

    const tokenPayload = checkHeadersAuthorization(context.req);

    const { 
        street,
        number,
        neighborhood,
        city,
        uf,
        zipcode,
    } = args;

    const user = await UserEntity.findOne({ id: tokenPayload.userId }, { relations: ['address'] });

    if(!user) throw new UserInputError('User not found');
    if(user.address && Object.keys(user.address).length > 0) {

        const oldAddress = await AddressEntity.findOne({ id: user.address.id });

        if(oldAddress) await oldAddress.remove();
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