import { createConnection } from 'typeorm';

const ormConfig = require('../../ormconfig');

const connection = createConnection(ormConfig);

export default connection;
