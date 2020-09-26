const dotenv = require('dotenv');

let env;
if(process.env.NODE_ENV === 'production') env = '.env';
else if(process.env.NODE_ENV === 'test') env = '.env.test';
else env = '.env.dev';

dotenv.config({
    path: env
});

/////////////////////////////

const path = require('path');

module.exports = {
    type: process.env.DB_TYPE,
    url: process.env.DATABASE_URL,
    entities: [path.join('src', 'entities', '*.ts')],
    migrations: [path.join('src', 'database', 'migrations', '*.ts')],
    cli: {
        migrationsDir: path.join('src', 'database', 'migrations')
    }
}
