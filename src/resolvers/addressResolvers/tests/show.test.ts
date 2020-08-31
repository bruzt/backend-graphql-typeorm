import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserEntity from '../../../entities/UserEntity';
import AddressEntity from '../../../entities/AddressEntity';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('Address Resolver Show test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should return an specific address', async () => {

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
                    query {
                        showAddress {
                            id
                            street
                        }
                    }
                `
            })
        ;
        
        expect(response.body.data.showAddress.id).toBe(`${addr.id}`);
        expect(response.body.data.showAddress.street).toBe('aaa');

    });
});
