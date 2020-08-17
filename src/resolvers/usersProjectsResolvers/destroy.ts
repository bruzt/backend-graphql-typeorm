import { UserInputError } from 'apollo-server-express';

import UsersProjectsEntity from '../../entities/UsersProjectsEntity';

export default async function destroy(id: number){

    const userProject = await UsersProjectsEntity.findOne({ id });

    if(!userProject) throw new UserInputError('UserProject not found');

    await userProject.softRemove();

    return true;
}
