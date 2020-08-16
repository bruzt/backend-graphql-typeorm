import userResolvers from './resolvers/userResolvers';

import { ICreateUser } from './resolvers/userResolvers/store';
import { IUpdateUser } from './resolvers/userResolvers/update';

export default {
    Query: {
        listUsers: () => userResolvers.list(),
        showUser: (_, body: { id: number; }) => userResolvers.show(body.id),
    },

    Mutation: {
        createUser: (_, body: ICreateUser) => userResolvers.store(body),
        updateUser: (_, body: IUpdateUser) => userResolvers.update(body),
        destroyUser: (_, body: { id: number }) => userResolvers.destroy(body.id),
    }
}