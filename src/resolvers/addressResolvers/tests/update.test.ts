import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserEntity from '../../../entities/UserEntity';
import AddressEntity from '../../../entities/AddressEntity';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('Address Resolver Update test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should update an address', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();
        const jwt = user.generateJwt();

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
            .set('authorization', `Bearer ${jwt.token}`)
            .send({
                query: `
                    mutation {
                        updateAddress(
                            street: "Rua Ace Ventura"
                            number: "999"
                            neighborhood: "Detetive de Animais"
                            city: "Zoo"
                            uf: "rj"
                            zipcode: "102546355"
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

        expect(response.body.data.updateAddress.id).toBe(`${addr.id}`);
        expect(response.body.data.updateAddress.street).toBe('Rua Ace Ventura');
        expect(response.body.data.updateAddress.number).toBe('999');
        expect(response.body.data.updateAddress.neighborhood).toBe('Detetive de Animais');
        expect(response.body.data.updateAddress.city).toBe('Zoo');
        expect(response.body.data.updateAddress.uf).toBe('rj');
        expect(response.body.data.updateAddress.zipcode).toBe('102546355');
    });

    it('should return an error for "Address not found"', async () => {

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
                        updateAddress(
                            street: "Rua Ace Ventura"
                        ) {
                            id
                        }
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe('Address not found');
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
                        updateAddress(
                            street: "Rua Ace Ventura"
                        ) {
                            id
                        }
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe('User not found');
    });
});
