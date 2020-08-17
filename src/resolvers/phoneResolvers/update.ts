import { UserInputError } from 'apollo-server-express';

import PhoneEntity from '../../entities/PhoneEntity';

export interface IUpdatePhone {
    id: number;
    newPhone: string;
}

export default async function update({
    id,
    newPhone
}: IUpdatePhone){

    const phone = await PhoneEntity.findOne({ id });

    if(!phone) throw new UserInputError('Phone not found');

    phone.phone = newPhone;

    return phone.save();
}
