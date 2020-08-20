import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserEntity from '../../../entities/UserEntity';
import truncateDBTables from '../../../testUtils/truncateDBTables';
import PhoneEntity from '../../../entities/PhoneEntity';

describe('Phone Resolver Show test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should return an specific phone', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });

        await user.save();

        const phone = PhoneEntity.create({
            phone: '996541245',
            user: user
        });
        await phone.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    query {
                        showPhone(id: ${phone.id}) {
                            id
                            phone
                        }
                    }
                `
            })
        ;

        expect(response.body.data.showPhone.id).toBe(`${phone.id}`);
        expect(response.body.data.showPhone.phone).toBe('996541245');
    });
});
