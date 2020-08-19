import supertest from 'supertest';

import connection from '../../../database/connection';

import app from '../../../app';
import clearDBTables from '../../../testUtils/clearDBTables';

describe('User Resolver Store test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return clearDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should store an user', async () => {

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        storeUser(
                            name: "novo user"
                            email: "u@t.com"
                            password: "1b5C8"
                        ) {
                            id
                            name
                        }
                    }
                `
            })
        ;

        expect(response.body.data.storeUser.name).toBe('novo user');
    });
});
