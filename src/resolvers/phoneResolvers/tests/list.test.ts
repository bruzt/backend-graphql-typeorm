import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserEntity from '../../../entities/UserEntity';
import truncateDBTables from '../../../testUtils/truncateDBTables';
import PhoneEntity from '../../../entities/PhoneEntity';

describe('Phone Resolver List test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should return an array of phones', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });

        await user.save();

        const phone1 = PhoneEntity.create({
            phone: '996541245',
            user: user
        });
        await phone1.save();

        const phone2 = PhoneEntity.create({
            phone: '354525698',
            user: user
        });
        await phone2.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    query {
                        listPhones {
                            id
                            phone
                        }
                    }
                `
            })
        ;

        expect(response.body.data.listPhones.length).toBe(2);
    });
});
