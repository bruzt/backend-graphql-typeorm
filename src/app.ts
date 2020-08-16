import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schemas from './schemas';
import resolverMap from './resolverMap';

import './database/connection';

const app = express();

const apollo = new ApolloServer({
    typeDefs: schemas,
    resolvers: resolverMap,
    debug: false // remove stacktrace from error response
});

apollo.applyMiddleware({ app });

export default app;
