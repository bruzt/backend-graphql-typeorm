import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserEntity from '../../../entities/UserEntity';
import truncateDBTables from '../../../testUtils/truncateDBTables';
import PhoneEntity from '../../../entities/PhoneEntity';

describe('Phone Resolver Store test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should store a phone', async () => {

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
                        storePhone(
                            phone: "987452217"
                        ) {
                            id
                            phone
                        }
                    }
                `
            })
        ;

        expect(response.body.data.storePhone.phone).toBe("987452217");
    });

    it('should return an error for "User not found"', async () => {

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
                        storePhone(
                            phone: "987452217"
                        ) {
                            id
                            phone
                        }
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe('User not found');
    });
});
