import { UserInputError } from 'apollo-server-express';
import { Request } from 'express';

import checkHeadersAuthorization from '../../utils/checkHeadersAuthorization';
import UserEntity from '../../entities/UserEntity';

export interface IUpdateAddress {
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    uf?: string;
    zipcode?: string;
}

export default async function update(args: IUpdateAddress, context: { req: Request; }){

    const tokenPayload = checkHeadersAuthorization(context.req);

    const {
        street,
        number,
        neighborhood,
        city,
        uf,
        zipcode,
    } = args;    

    const user = await UserEntity.findOne({ id: tokenPayload.userId }, {
        relations: ['address']
    });
    
    if(!user) throw new UserInputError('User not found');
    if(!user.address) throw new UserInputError('Address not found');

    if(street) user.address.street = street;
    if(number) user.address.number = number;
    if(neighborhood) user.address.neighborhood = neighborhood;
    if(city) user.address.city = city;
    if(uf) user.address.uf = uf;
    if(zipcode) user.address.zipcode = zipcode;

    return user.address.save();
}
