import supertest from 'supertest';

import connection from '../../../database/connection';

import app from '../../../app';
import UserEntity from '../../../entities/UserEntity';

describe('User Resolver List test suit', () => {

    beforeAll( async () => {

        await connection;
    });

    afterAll( async () => {

        await (await connection).close();
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

        await user1.remove();
        await user2.remove();

        expect(response.body.data.listUsers.length).toBe(2);
        expect(response.body.data.listUsers[0].name).toBe('teste 1');
    });
});
