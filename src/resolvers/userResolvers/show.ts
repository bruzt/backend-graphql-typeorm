
import UserEntity from '../../entities/UserEntity';

export default function show(id: number){

    return UserEntity.findOne({ id }, {
        relations: ['address', 'phones', 'usersProjects']
    });
}
