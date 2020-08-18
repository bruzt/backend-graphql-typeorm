import dotenv from 'dotenv';

let env: string;
if(process.env.NODE_ENV === 'test') env = '.env.test';
else if(process.env.NODE_ENV === 'production') env = '.env';
else env = '.env.dev';

dotenv.config({
    path: env
});

/////////////////////////////

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

apollo.applyMiddleware({ 
    app,
    cors: { origin: process.env.CORS_ORIGIN_URL } 
});

export default app;
