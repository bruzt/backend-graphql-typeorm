import { UserInputError } from 'apollo-server-express';

import AddressEntity from '../../entities/AddressEntity';

export interface IUpdateAddress {
    id: number;
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    uf?: string;
    zipcode?: string;
}

export default async function update({
    id,
    street,
    number,
    neighborhood,
    city,
    uf,
    zipcode,
}: IUpdateAddress){

    const address = await AddressEntity.findOne({ id });

    if(!address) throw new UserInputError('Address not found');

    if(street) address.street = street;
    if(number) address.number = number;
    if(neighborhood) address.neighborhood = neighborhood;
    if(city) address.city = city;
    if(uf) address.uf = uf;
    if(zipcode) address.zipcode = zipcode;

    return address.save();
}
