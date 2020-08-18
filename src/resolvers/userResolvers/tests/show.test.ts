import supertest from 'supertest';

import connection from '../../../database/connection';

import app from '../../../app';
import UserEntity from '../../../entities/UserEntity';

describe('User Resolver Show test suit', () => {

    beforeAll( async () => {

        await connection;
    });

    afterAll( async () => {

        await (await connection).close();
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
        
        const userId = user.id;
        await user.remove();

        expect(Number(response.body.data.showUser.id)).toBe(userId);
    });
});
