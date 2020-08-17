import UsersProjectsEntity from '../../entities/UsersProjectsEntity';

export default async function list(){

    return UsersProjectsEntity.find();
}
