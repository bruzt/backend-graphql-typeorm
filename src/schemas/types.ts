import { gql } from 'apollo-server-express';

export default gql`

    type Token {
        token: String!
    }

    type User {
        id: ID
        name: String
        email: String
        createdAt: String
        updatedAt: String
        usersProjects: [UsersProjects]
    }

    type Address {
        id: ID
        street: String
        number: String
        neighborhood: String
        city: String
        uf: String
        zipcode: String
        createdAt: String
        updatedAt: String
    }

    type Phone {
        id: ID
        phone: String
        createdAt: String
        updatedAt: String
    }

    type Project {
        id: ID
        title: String
        description: String
        createdAt: String
        updatedAt: String
    }

    type UsersProjects {
        id: ID
        status: String
        createdAt: String
        updatedAt: String
        deletedAt: String
        project: Project
    }

    type UsersProjectsStore {
        id: ID
        status: String
        createdAt: String
    }

`;