import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import truncateDBTables from '../../../testUtils/truncateDBTables';
import UserEntity from '../../../entities/UserEntity';

describe('User Resolver Store test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
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

    it('should return an error for "e-mail already in use"', async () => {

        const user = UserEntity.create({
            name: "Luke",
            email: "test@test.com",
            password: "111",
        });
        await user.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        storeUser(
                            name: "novo user"
                            email: "test@test.com"
                            password: "1b5C8"
                        ) {
                            id
                            name
                        }
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0]).toHaveProperty('message');
        expect(response.body.errors[0].message).toBe('e-mail already in use');
    });
});
