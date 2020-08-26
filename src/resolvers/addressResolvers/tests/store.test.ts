import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserEntity from '../../../entities/UserEntity';
import AddressEntity from '../../../entities/AddressEntity';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('Address Resolver Store test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should store an address', async () => {

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
                        storeAddress(
                            street: "Rua teste testando"
                            number: "69a"
                            neighborhood: "Bairro testador"
                            city: "testeville"
                            uf: "sp"
                            zipcode: "96547888"
                        ) {
                            id
                            street
                            number
                            neighborhood
                            city
                            uf
                            zipcode
                        }
                    }
                `
            })
        ;

        expect(response.body.data.storeAddress.street).toBe('Rua teste testando');
        expect(response.body.data.storeAddress.number).toBe('69a');
        expect(response.body.data.storeAddress.neighborhood).toBe('Bairro testador');
        expect(response.body.data.storeAddress.city).toBe('testeville');
        expect(response.body.data.storeAddress.uf).toBe('sp');
        expect(response.body.data.storeAddress.zipcode).toBe('96547888');
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
                        storeAddress(
                            street: "Rua teste testando"
                            number: "69a"
                            neighborhood: "Bairro testador"
                            city: "testeville"
                            uf: "sp"
                            zipcode: "96547888"
                        ) {
                            id
                        }
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe("User not found");
    });

    it('should remove old address before add the new one', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();
        const jwt = user.generateJwt();

        const address = AddressEntity.create({
            street: "Rua test testing",
            number: "69b",
            neighborhood: "Bairro test",
            city: "testcity",
            uf: "sc",
            zipcode: "126524996",
            user,
        });
        await address.save();

        const response = await supertest(app).post('/graphql')
            .set('authorization', `Bearer ${jwt.token}`)
            .send({
                query: `
                    mutation {
                        storeAddress(
                            street: "Rua teste testando"
                            number: "69a"
                            neighborhood: "Bairro testador"
                            city: "testeville"
                            uf: "sp"
                            zipcode: "96547888"
                        ) {
                            id
                            street
                        }
                    }
                `
            })
        ;

        expect(response.body.data.storeAddress.street).toBe('Rua teste testando');
    });
});
