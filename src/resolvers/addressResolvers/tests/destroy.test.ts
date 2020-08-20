import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserEntity from '../../../entities/UserEntity';
import AddressEntity from '../../../entities/AddressEntity';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('Address Resolver Destroy test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should delete an address', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();

        const addr = AddressEntity.create({
            street: 'aaa',
            number: 'bbb',
            neighborhood: 'ccc',
            city: 'ddd',
            uf: 'eee',
            zipcode: '111',
            user: user
        });
        await addr.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        destroyAddress(id: ${addr.id})
                    }
                `
            })
        ;

        expect(response.body.data.destroyAddress).toBe(true);
    });

    it('should return an error for "Address not found"', async () => {

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        destroyAddress(id: 1)
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe("Address not found");
    });
});
