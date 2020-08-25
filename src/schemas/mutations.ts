import { gql } from 'apollo-server-express';

export default gql`

    type Mutation {

        session(
            email: String!
            password: String!
        ): Token

        #################################

        storeUser(
            name: String!
            email: String!
            password: String!
        ): User

        updateUser(
            id: Int!
            name: String
            email: String
            password: String
        ): User

        destroyUser(id: ID!): Boolean

        #################################

        storeAddress(
            street: String!
            number: String!
            neighborhood: String!
            city: String!
            uf: String!
            zipcode: String!
            userId: ID!
        ): Address

        updateAddress(
            id: ID!
            street: String
            number: String
            neighborhood: String
            city: String
            uf: String
            zipcode: String
        ): Address

        destroyAddress(id: ID!): Boolean

        #################################

        storePhone(
            userId: ID!
            phone: String!
        ): Phone

        updatePhone(
            id: ID!
            newPhone: String!
        ): Phone

        destroyPhone(id: ID!): Boolean

        ################################

        storeProject(
            title: String!
            description: String!
        ): Project

        updateProject(
            id: ID!
            title: String
            description: String
        ): Project

        destroyProject(id: ID!): Boolean

        ################################

        storeUserProject(
            status: String
            userId: ID!
            projectId: ID!
        ): UsersProjectsStore

        updateUserProject(
            id: ID!
            status: String
        ): UsersProjectsStore

        destroyUserProject(id: ID!): Boolean
    }
`;
