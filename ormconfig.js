const dotenv = require('dotenv');

let env;
if(process.env.NODE_ENV === 'test') env = '.env.test';
else if(process.env.NODE_ENV === 'production') env = '.env';
else env = '.env.dev';

dotenv.config({
    path: env
});

/////////////////////////////

const path = require('path');

module.exports = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path.join('src', 'entities', '*.ts')],
    migrations: [path.join('src', 'database', 'migrations', '*.ts')],
    cli: {
        migrationsDir: path.join('src', 'database', 'migrations')
    }
}
