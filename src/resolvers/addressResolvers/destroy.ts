import { UserInputError } from 'apollo-server-express';

import AddressEntity from '../../entities/AddressEntity';

export default async function destroy(id: number){

    const address = await AddressEntity.findOne({ id });

    if(!address) throw new UserInputError('Address not found');

    await address.remove();

    return true;
}
