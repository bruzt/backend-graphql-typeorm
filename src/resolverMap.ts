import { Request } from 'express';

import session from './resolvers/sessionResolver/store';
import userResolvers from './resolvers/userResolvers';
import addressResolvers from './resolvers/addressResolvers';
import phoneResolvers from './resolvers/phoneResolvers';
import projectResolvers from './resolvers/projectResolvers';
import usersProjectsResolvers from './resolvers/usersProjectsResolvers';

import { ISession } from './resolvers/sessionResolver/store';
import { IStoreUser } from './resolvers/userResolvers/store';
import { IUpdateUser } from './resolvers/userResolvers/update';
import { IStoreAddress } from './resolvers/addressResolvers/store';
import { IUpdateAddress } from './resolvers/addressResolvers/update';
import { IStorePhone } from './resolvers/phoneResolvers/store';
import { IUpdatePhone } from './resolvers/phoneResolvers/update';
import { IStoreProject } from './resolvers/projectResolvers/store';
import { IUpdateProject } from './resolvers/projectResolvers/update';
import { IStoreUsersProjects } from './resolvers/usersProjectsResolvers/store';
import { IUpdateUserProject } from './resolvers/usersProjectsResolvers/update';

interface IContext {
    req: Request;
}

export default {

    Query: {

        listUsers: () => userResolvers.list(),
        showUser: (parent: unknown, args: unknown, context: IContext) => userResolvers.show(context),

        showAddress: (parent: unknown, args: unknown, context: IContext) => addressResolvers.show(context),

        listPhones: (parent: unknown, args: unknown, context: IContext) => phoneResolvers.list(context),

        listProjects: () => projectResolvers.list(),
        showProject: (parent: unknown, args: { id: number; }) => projectResolvers.show(args.id),

        listUsersProjects: (parent: unknown, args: unknown, context: IContext) => usersProjectsResolvers.list(context),

    },

    Mutation: {

        session: (parent: unknown, args: ISession) => session(args),

        storeUser: (parent: unknown, args: IStoreUser) => userResolvers.store(args),
        updateUser: (parent: unknown, args: IUpdateUser, context: IContext) => userResolvers.update(args, context),
        destroyUser: (parent: unknown, args: unknown, context: IContext) => userResolvers.destroy(context),

        storeAddress: (parent: unknown, args: IStoreAddress, context: IContext) => addressResolvers.store(args, context),
        updateAddress: (parent: unknown, args: IUpdateAddress, context: IContext) => addressResolvers.update(args, context),
        destroyAddress: (parent: unknown, args: unknown, context: IContext) => addressResolvers.destroy(context),

        storePhone: (parent: unknown, args: IStorePhone, context: IContext) => phoneResolvers.store(args, context),
        updatePhone: (parent: unknown, args: IUpdatePhone, context: IContext) => phoneResolvers.update(args, context),
        destroyPhone: (parent: unknown, args: { id: number; }, context: IContext) => phoneResolvers.destroy(args.id, context),

        storeProject: (parent: unknown, args: IStoreProject) => projectResolvers.store(args),
        updateProject: (parent: unknown, args: IUpdateProject) => projectResolvers.update(args),
        destroyProject: (parent: unknown, args: { id: number; }) => projectResolvers.destroy(args.id),

        storeUserProject: (parent: unknown, args: IStoreUsersProjects) => usersProjectsResolvers.store(args),
        updateUserProject: (parent: unknown, args: IUpdateUserProject) => usersProjectsResolvers.update(args),
        destroyUserProject: (parent: unknown, args: { id: number; }) => usersProjectsResolvers.destroy(args.id),

    }
}
