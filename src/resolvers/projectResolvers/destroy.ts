import { UserInputError } from 'apollo-server-express';

import ProjectEntity from '../../entities/ProjectEntity';

export default async function destroy(id: number){

    const project = await ProjectEntity.findOne({ id });

    if(!project) throw new UserInputError('Project not found');

    await project.softRemove();

    return true;
}
