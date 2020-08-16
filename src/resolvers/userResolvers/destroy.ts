import { UserInputError } from 'apollo-server-express';

import UserEntity from '../../entities/UserEntity';

export default async function destroy(id: number){

    const user = await UserEntity.findOne({ id });

    if(!user) throw new UserInputError('User not found');

    const d = await UserEntity.softRemove(user);

    console.log(d);

    return d;
}
