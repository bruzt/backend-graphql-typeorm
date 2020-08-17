import PhoneEntity from '../../entities/PhoneEntity';

export default function list(){

    return PhoneEntity.find({
        relations: [
            'user', 
            'user.address',
            'user.phones',
            'user.usersProjects'
        ]
    });
}
