import PhoneEntity from '../../entities/PhoneEntity';

export default function show(id: number){

    return PhoneEntity.findOne({ id }, {
        relations: [
            'user', 
            'user.address',
            'user.phones',
            'user.usersProjects'
        ]
    });
}
