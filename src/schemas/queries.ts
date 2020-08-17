import { gql } from 'apollo-server-express';

export default gql`

    type Query {

        listUsers: [User]
        showUser(id: ID!): User

        listAddress: [Address]
        showAddress(id: ID!): Address

        listPhones: [Phone]
        showPhone(id: ID!): Phone

        listProjects: [Project]
        showProject(id: ID!): Project

        listUsersProjects: [UsersProjects]
        showUsersProjects(id: ID!): UsersProjects

    }
`;
