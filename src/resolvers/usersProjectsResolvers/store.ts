import UsersProjectsEntity from '../../entities/UsersProjectsEntity';

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

    const newUserProject = UsersProjectsEntity.create({
        status,
        user: userId as any,
        project: projectId as any
    });

    return newUserProject.save();
}
