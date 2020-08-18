import supertest from 'supertest';

import connection from '../../../database/connection';

import app from '../../../app';
import UserEntity from '../../../entities/UserEntity';
import AddressEntity from '../../../entities/AddressEntity';

describe('Address Resolver List test suit', () => {

    beforeAll( async () => {

        await connection;
    });

    afterAll( async () => {

        await (await connection).close();
    });

    it('should return an array of addresses', async () => {

        const user1 = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });

        await user1.save();

        const user2 = UserEntity.create({
            name: 'test 2',
            email: 'test2@test.com',
            password: '456'
        });
        await user2.save();

        const addr1 = AddressEntity.create({
            street: 'aaa',
            number: 'bbb',
            neighborhood: 'ccc',
            city: 'ddd',
            uf: 'eee',
            zipcode: '111',
            user: user1
        });
        await addr1.save();

        const addr2 = AddressEntity.create({
            street: 'fff',
            number: 'ggg',
            neighborhood: 'hhh',
            city: 'iii',
            uf: 'jjj',
            zipcode: '222',
            user: user2
        });
        await addr2.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    query {
                        listAddresses {
                            id
                            street
                        }
                    }
                `
            })
        ;

        expect(response.body.data.listAddresses.length).toBe(2);
        expect(response.body.data.listAddresses[0].street).toBe('aaa');
        
        await user1.remove();
        await user2.remove();
        await addr1.remove();
        await addr2.remove();
    });
});
