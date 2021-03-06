import { UserInputError } from 'apollo-server-express';

import UserEntity from '../../entities/UserEntity';

export interface IStoreUser {
    name: string;
    email: string;
    password: string;
}

export default async function store({
    name,
    email,
    password
}: IStoreUser){
 
    const user = await UserEntity.findOne({ email }, { withDeleted: true });

    if(user && !user.deletedAt) throw new UserInputError('e-mail already in use');
    else if(user && user.deletedAt) {
        
        user.name = name;
        user.password = password;

        await user.save();
    
        return user.recover();

    } else {

        const newUser = UserEntity.create({
            name,
            email,
            password
        });
    
        return newUser.save()
    }
}