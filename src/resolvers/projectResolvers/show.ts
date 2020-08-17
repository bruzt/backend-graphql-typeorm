import { UserInputError } from 'apollo-server-express';

import ProjectEntity from '../../entities/ProjectEntity';

export default async function show(id: number){

    const project = await ProjectEntity.findOne({ id });

    if(!project) throw new UserInputError('User not found');

    return project;
}
