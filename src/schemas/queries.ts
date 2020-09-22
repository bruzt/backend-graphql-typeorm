import { gql } from 'apollo-server-express';

export default gql`

    type Query {

        listUsers: [User]
        showUser: User

        showAddress: Address

        listPhones: [Phone]

        listProjects: [Project]
        showProject(id: ID!): Project

        listUsersProjects: [UsersProjects]
        showUsersProjects(id: ID!): UsersProjects

    }
`;
