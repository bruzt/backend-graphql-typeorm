import AddressEntity from '../../entities/AddressEntity';

export interface IStoreAddress {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    uf: string;
    zipcode: string;
    userId: number;
}

export default function store({ 
    street,
    number,
    neighborhood,
    city,
    uf,
    zipcode,
    userId,
}: IStoreAddress){

    const newAddress = AddressEntity.create({
        street,
        number,
        neighborhood,
        city,
        uf,
        zipcode,
        user: userId as any,
    });

    return newAddress.save();
}