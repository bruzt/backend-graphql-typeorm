import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserEntity from '../../../entities/UserEntity';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('User Resolver Update test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should update an user', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();
        const jwt = user.generateJwt();

        const response = await supertest(app).post('/graphql')
            .set('authorization', `Bearer ${jwt.token}`)
            .send({
                query: `
                    mutation {
                        updateUser(
                            name: "Novo nome"
                            email: "novo@email.com"
                            password: "456"
                        ) {
                            id
                            name
                            email
                        }
                    }
                `
            })
        ;

        expect(response.status).toBe(200);
        expect(response.body.data.updateUser.id).toBe(`${user.id}`);
        expect(response.body.data.updateUser.name).toBe("Novo nome");
        expect(response.body.data.updateUser.email).toBe("novo@email.com");
    });

    it('should return error for "User not found"', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();
        const jwt = user.generateJwt();
        await user.remove();

        const response = await supertest(app).post('/graphql')
            .set('authorization', `Bearer ${jwt.token}`)
            .send({
                query: `
                    mutation {
                        updateUser(
                            name: "Novo nome"
                            email: "novo@email.com"
                            password: "456"
                        ) {
                            id
                            name
                            email
                        }
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe("User not found");
    });
});
