import supertest from 'supertest';

import connection from '../../../database/connection';

import app from '../../../app';
import UserEntity from '../../../entities/UserEntity';
import clearDBTables from '../../../testUtils/clearDBTables';

describe('User Resolver Show test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return clearDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should return an specific user', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });

        await user.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    query {
                        showUser(id: ${user.id}) {
                            id
                        }
                    }
                `
            })
        ;

        expect(Number(response.body.data.showUser.id)).toBe(user.id);
    });
});
