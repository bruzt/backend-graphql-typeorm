const path = require('path');

module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "devDB",
    password: "123",
    database: "tests",
    entities: [path.join('src', 'entities', '*.ts')],
    migrations: [path.join('src', 'database', 'migrations', '*.ts')],
    cli: {
        migrationsDir: path.join('src', 'database', 'migrations')
    }
}
