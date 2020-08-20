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

    it('should store an phone', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        storePhone(
                            userId: ${user.id}
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

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        storePhone(
                            userId: 1
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
