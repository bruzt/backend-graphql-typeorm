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
        #address: Address
        #phones: [Phone]
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
        #user: User
    }

    type Phone {
        id: ID
        phone: String
        createdAt: String
        updatedAt: String
        #user: User
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
        user: User
        project: Project
    }

    type UsersProjectsStore {
        id: ID
        status: String
        createdAt: String
    }

`;