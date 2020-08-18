import { UserInputError } from 'apollo-server-express';

import UsersProjectsEntity from '../../entities/UsersProjectsEntity';
import UserEntity from '../../entities/UserEntity';
import ProjectEntity from '../../entities/ProjectEntity';

export interface IStoreUsersProjects {
    status?: string;
    userId: number;
    projectId: number;
}

export default async function store({
    status,
    userId,
    projectId
}: IStoreUsersProjects){

    const user = await UserEntity.findOne({ id: userId });
    if(!user) throw new UserInputError('User not found');

    const project = await ProjectEntity.findOne({ id: projectId });
    if(!project) throw new UserInputError('Project not found');

    const userProject = await UsersProjectsEntity.findOne({ user, project });
    if(userProject) throw new UserInputError('User already assign to this project');

    const newUserProject = UsersProjectsEntity.create({
        status,
        user,
        project
    });

    return newUserProject.save();
}
