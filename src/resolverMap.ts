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

export default {

    Query: {

        listUsers: () => userResolvers.list(),
        showUser: (_: unknown, args: { id: number; }) => userResolvers.show(args.id),

        listAddresses: () => addressResolvers.list(),
        showAddress: (_: unknown, args: { id: number; }) => addressResolvers.show(args.id),

        listPhones: () => phoneResolvers.list(),
        showPhone: (_: unknown, args: { id: number; }) => phoneResolvers.show(args.id),

        listProjects: () => projectResolvers.list(),
        showProject: (_: unknown, args: { id: number; }) => projectResolvers.show(args.id),

        listUsersProjects: () => usersProjectsResolvers.list(),
        showUsersProjects: (_: unknown, args: { id: number; }) => usersProjectsResolvers.show(args.id),

    },

    Mutation: {

        session: (_: unknown, args: ISession) => session(args),

        storeUser: (_: unknown, args: IStoreUser) => userResolvers.store(args),
        updateUser: (_: unknown, args: IUpdateUser, context: { req: Request; }) => userResolvers.update(args, context),
        destroyUser: (_: unknown, args: unknown, context: { req: Request; }) => userResolvers.destroy(context),

        storeAddress: (_: unknown, args: IStoreAddress, context: { req: Request; }) => addressResolvers.store(args, context),
        updateAddress: (_: unknown, args: IUpdateAddress, context: { req: Request; }) => addressResolvers.update(args, context),
        destroyAddress: (_: unknown, args: unknown, context: { req: Request; }) => addressResolvers.destroy(context),
        
        storePhone: (_: unknown, args: IStorePhone, context: { req: Request; }) => phoneResolvers.store(args, context),
        updatePhone: (_: unknown, args: IUpdatePhone) => phoneResolvers.update(args),
        destroyPhone: (_: unknown, args: { id: number; }) => phoneResolvers.destroy(args.id),

        storeProject: (_: unknown, args: IStoreProject) => projectResolvers.store(args),
        updateProject: (_: unknown, args: IUpdateProject) => projectResolvers.update(args),
        destroyProject: (_: unknown, args: { id: number; }) => projectResolvers.destroy(args.id),

        storeUserProject: (_: unknown, args: IStoreUsersProjects) => usersProjectsResolvers.store(args),
        updateUserProject: (_: unknown, args: IUpdateUserProject) => usersProjectsResolvers.update(args),
        destroyUserProject: (_: unknown, args: { id: number; }) => usersProjectsResolvers.destroy(args.id),

    }
}