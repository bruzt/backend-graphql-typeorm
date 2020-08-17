import { UserInputError } from 'apollo-server-express';

import UsersProjectsEntity from '../../entities/UsersProjectsEntity';

export interface IUpdateUserProject {
    id: number;
    status?: string;
}

export default async function update({
    id,
    status
}: IUpdateUserProject){

    const userProject = await UsersProjectsEntity.findOne({ id });

    if(!userProject) throw new UserInputError('UserProject not found');

    if(status) userProject.status = status;

    return userProject.save();
}
