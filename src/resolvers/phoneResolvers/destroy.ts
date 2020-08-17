import PhoneEntity from '../../entities/PhoneEntity';
import { UserInputError } from 'apollo-server-express';

export default async function destroy(id: number){

    const phone = await PhoneEntity.findOne({ id }, {
        withDeleted: true
    });

    if(!phone) throw new UserInputError('Phone not found');

    await phone.remove();

    return true;
}
