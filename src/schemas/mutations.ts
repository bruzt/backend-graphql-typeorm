import { gql } from 'apollo-server-express';

export default gql`

    type Mutation {

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
    }
`;
