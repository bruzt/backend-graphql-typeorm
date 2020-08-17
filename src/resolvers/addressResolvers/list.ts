import AddressEntity from '../../entities/AddressEntity';

export default function list(){

    return AddressEntity.find({
        relations: [
            'user', 
            'user.address',
            'user.phones',
            'user.usersProjects'
        ]
    });
}
