API Node.js escrita em Typescript utilizando GraphQL, TypeORM e o banco de dados PostgreSQL com exemplos de relacionamento 1:1, 1:N e N:N com Jest para testes automatizados.

A API cadastra usuários e projetos, o usuário pode cadastrar um endereço e vários telefones. Para buscar, cadastrar, alterar ou deletar o endereço ou um dos telefones o usuário precisa se autenticar, enviando uma Bearer Token no headers da requisição. O usuário pode ser atribuído a vários projetos e um projeto pode estar atribuído a vários usuários.

## Schema

### Query
```
listUsers: [User]
showUser: User

listAddresses: [Address]
showAddress: Address

listPhones: [Phone]
showPhone(id: ID!): Phone

listProjects: [Project]
showProject(id: ID!): Project

listUsersProjects: [UsersProjects]
showUsersProjects(id: ID!): UsersProjects
```

### Mutation
```
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
    name: String
    email: String
    password: String
): User

destroyUser: Boolean

#################################

storeAddress(
    street: String!
    number: String!
    neighborhood: String!
    city: String!
    uf: String!
    zipcode: String!
): Address

updateAddress(
    street: String
    number: String
    neighborhood: String
    city: String
    uf: String
    zipcode: String
): Address

destroyAddress: Boolean

#################################

storePhone(
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
```

<p align="center">
  <img src="https://github.com/bruzt/backend-graphql-typeorm/blob/master/img1.gif?raw=true">
</p>

## Para testar

Se você deseja testar essa API instale os pacotes com o comando "npm install" e inicie um banco de dados Postgres com o comando abaixo (requer [Docker](https://www.docker.com/)):

```
sudo docker run --rm -d \
    --name postgres-typeorm-dev \
    -e POSTGRES_USER=devDB \
    -e POSTGRES_PASSWORD=123 \
    -e POSTGRES_DB=dev \
    -p 5432:5432 \
    postgres:12.3
```

* Se você deseja usar outro banco será necessário alterar os dados no arquivo ".env.dev" na raiz do projeto.

Após iniciar o banco de dados execute as migrations para criar as tabelas no banco de dados com o comando "npm run dev:migration:run" e inicie o projeto com o comando "npm run dev".
Para acessar a API use o [Insomnia](https://insomnia.rest/) e importe o workspace que está na raiz do projeto ("Insomnia_workspace.json").

