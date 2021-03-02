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

let ormconfig;

if(process.env.NODE_ENV === 'production'){
    ormconfig = {
        type: process.env.DB_TYPE,
        url: process.env.DATABASE_URL,
        entities: [path.join('build', 'src', 'entities', '*.js')],
        migrations: [path.join('build', 'src', 'database', 'migrations', '*.js')],
        cli: {
            migrationsDir: path.join('build', 'src', 'database', 'migrations')
        }
    }
} else {
    ormconfig = {
        type: process.env.DB_TYPE,
        url: process.env.DATABASE_URL,
        entities: [path.join('src', 'entities', '*.ts')],
        migrations: [path.join('src', 'database', 'migrations', '*.ts')],
        cli: {
            migrationsDir: path.join('src', 'database', 'migrations')
        }
    }
}

module.exports = ormconfig;
