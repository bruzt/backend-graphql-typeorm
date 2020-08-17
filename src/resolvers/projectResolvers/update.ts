import { UserInputError } from 'apollo-server-express';

import ProjectEntity from '../../entities/ProjectEntity';

export interface IUpdateProject {
    id: number;
    title?: string;
    description?: string;
}

export default async function update({
    id,
    title,
    description
}: IUpdateProject){

    const project = await ProjectEntity.findOne({ id });

    if(!project) throw new UserInputError('Project not found');

    if(title) project.title = title;
    if(description) project.description = description;

    return project.save();
}
