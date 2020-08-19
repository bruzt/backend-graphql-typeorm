import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserEntity from '../../../entities/UserEntity';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('User Resolver List test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should return an array of users', async () => {

        const user1 = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });

        await user1.save();

        const user2 = UserEntity.create({
            name: 'test 2',
            email: 'test2@test.com',
            password: '456'
        });
        await user2.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    query {
                        listUsers {
                            id
                            name
                            email
                        }
                    }
                `
            })
        ;

        expect(response.body.data.listUsers.length).toBe(2);
    });
});
