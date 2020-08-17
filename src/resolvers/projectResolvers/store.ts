import ProjectEntity from '../../entities/ProjectEntity';

export interface IStoreProject {
    title: string;
    description: string;
}

export default function store({
    title,
    description
}: IStoreProject){

    const newProject =  ProjectEntity.create({
        title,
        description
    });

    return newProject.save();
}