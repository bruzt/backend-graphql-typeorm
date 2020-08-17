import { gql } from 'apollo-server-express';

export default gql`

    type Query {

        listUsers: [User]
        showUser(id: ID!): User

        listAddress: [Address]
        showAddress(id: ID!): Address

    }
`;
