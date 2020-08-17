import userResolvers from './resolvers/userResolvers';
import addressResolvers from './resolvers/addressResolvers';

import { IStoreUser } from './resolvers/userResolvers/store';
import { IUpdateUser } from './resolvers/userResolvers/update';
import { IStoreAddress } from './resolvers/addressResolvers/store';
import { IUpdateAddress } from './resolvers/addressResolvers/update';

export default {
    Query: {

        listUsers: () => userResolvers.list(),
        showUser: (_, body: { id: number; }) => userResolvers.show(body.id),

        listAddress: () => addressResolvers.list(),
        showAddress: (_, body: { id: number; }) => addressResolvers.show(body.id),
    },

    Mutation: {

        storeUser: (_, body: IStoreUser) => userResolvers.store(body),
        updateUser: (_, body: IUpdateUser) => userResolvers.update(body),
        destroyUser: (_, body: { id: number }) => userResolvers.destroy(body.id),

        storeAddress: (_, body: IStoreAddress) => addressResolvers.store(body),
        updateAddress: (_, body: IUpdateAddress) => addressResolvers.update(body),
        destroyAddress: (_, body: { id: number; }) => addressResolvers.destroy(body.id),
    }
}