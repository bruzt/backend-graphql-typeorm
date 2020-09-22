import UserEntity from '../../entities/UserEntity';

export default function list(){

    return UserEntity.find({
        relations: ['usersProjects']
    });
}
