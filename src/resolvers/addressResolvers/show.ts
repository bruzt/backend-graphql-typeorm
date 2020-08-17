import AddressEntity from '../../entities/AddressEntity';

export default function show(id: number){

    return AddressEntity.findOne({ id }, {
        relations: [
            'user', 
            'user.address',
            'user.phones',
            'user.usersProjects'
        ]
    });
}
