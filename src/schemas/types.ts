import { gql } from 'apollo-server-express';

export default gql`

    type User {
        id: ID
        name: String
        email: String
        createdAt: String
        updatedAt: String
        address: Address
        phones: [Phone]
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
        user: User
    }

    type Phone {
        id: ID
        phone: String
        createdAt: String
        updatedAt: String
        user: User
    }

    type Project {
        id: ID
        title: String
        description: String
        createdAt: String
        updatedAt: String
    }

    type UsersProjects {
        project: Project
    }
`;