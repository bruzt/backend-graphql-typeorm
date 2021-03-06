import dotenv from 'dotenv';

let env: string;
if(process.env.NODE_ENV === 'production') env = '.env';
else if(process.env.NODE_ENV === 'test') env = '.env.test';
else env = '.env.dev';

dotenv.config({
    path: env
});

/////////////////////////////

import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import './database/connection';

import schemas from './schemas';
import resolverMap from './resolverMap';

const app = express();

const apollo = new ApolloServer({
    typeDefs: schemas,
    resolvers: resolverMap,
    context: ({ req }) => ({ req }),
    debug: false, // remove stacktrace from error response
});

apollo.applyMiddleware({ 
    app,
    cors: { 
        origin: process.env.CORS_ORIGIN,
    },
});

export default app;
