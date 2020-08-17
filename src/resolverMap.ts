import userResolvers from './resolvers/userResolvers';
import addressResolvers from './resolvers/addressResolvers';
import phoneResolvers from './resolvers/phoneResolvers';
import projectResolvers from './resolvers/projectResolvers';

import { IStoreUser } from './resolvers/userResolvers/store';
import { IUpdateUser } from './resolvers/userResolvers/update';
import { IStoreAddress } from './resolvers/addressResolvers/store';
import { IUpdateAddress } from './resolvers/addressResolvers/update';
import { IStorePhone } from './resolvers/phoneResolvers/store';
import { IUpdatePhone } from './resolvers/phoneResolvers/update';
import { IStoreProject } from './resolvers/projectResolvers/store';
import { IUpdateProject } from './resolvers/projectResolvers/update';

export default {

    Query: {

        listUsers: () => userResolvers.list(),
        showUser: (_, body: { id: number; }) => userResolvers.show(body.id),

        listAddress: () => addressResolvers.list(),
        showAddress: (_, body: { id: number; }) => addressResolvers.show(body.id),

        listPhones: () => phoneResolvers.list(),
        showPhone: (_, body: { id: number; }) => phoneResolvers.show(body.id),

        listProjects: () => projectResolvers.list(),
        showProject: (_, body: { id: number; }) => projectResolvers.show(body.id),

    },

    Mutation: {

        storeUser: (_, body: IStoreUser) => userResolvers.store(body),
        updateUser: (_, body: IUpdateUser) => userResolvers.update(body),
        destroyUser: (_, body: { id: number }) => userResolvers.destroy(body.id),

        storeAddress: (_, body: IStoreAddress) => addressResolvers.store(body),
        updateAddress: (_, body: IUpdateAddress) => addressResolvers.update(body),
        destroyAddress: (_, body: { id: number; }) => addressResolvers.destroy(body.id),
        
        storePhone: (_, body: IStorePhone) => phoneResolvers.store(body),
        updatePhone: (_, body: IUpdatePhone) => phoneResolvers.update(body),
        destroyPhone: (_, body: { id: number; }) => phoneResolvers.destroy(body.id),

        storeProject: (_, body: IStoreProject) => projectResolvers.store(body),
        updateProject: (_, body: IUpdateProject) => projectResolvers.update(body),
        destroyProject: (_, body: { id: number; }) => projectResolvers.destroy(body.id),

    }
}