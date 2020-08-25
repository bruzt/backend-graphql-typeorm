import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import truncateDBTables from '../../../testUtils/truncateDBTables';
import UserEntity from '../../../entities/UserEntity';

describe('Session Resolver Store test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should authenticate and return a JWT', async () => {

        const user = UserEntity.create({
            name: 'Teste',
            email: 'teste@em.com',
            password: 'hahaha'
        });
        await user.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        session (
                            email: "teste@em.com"
                            password: "hahaha"
                        ){
                            token
                        }
                    }
                `
            })
        ;

        expect(response.body.data.session.token.length).toBeGreaterThan(100);
    });

    it('should not authenticate for "User not found"', async () => {

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        session (
                            email: "teste@em.com"
                            password: "hahaha"
                        ){
                            token
                        }
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe("User not found");
    });

    it('should not authenticate for "Password do not match"', async () => {

        const user = UserEntity.create({
            name: 'Teste',
            email: 'teste@em.com',
            password: 'hahaha'
        });
        await user.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        session (
                            email: "teste@em.com"
                            password: "123"
                        ){
                            token
                        }
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe("Password do not match");
    });
});
