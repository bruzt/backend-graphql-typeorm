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

    it('should delete a phone', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();
        const jwt = user.generateJwt();

        const phone = PhoneEntity.create({
            phone: '996541245',
            user: user
        });
        await phone.save();

        const response = await supertest(app).post('/graphql')
            .set('authorization', `Bearer ${jwt.token}`)
            .send({
                query: `
                    mutation {
                        destroyPhone(id: ${phone.id})
                    }
                `
            })
        ;

        expect(response.body.data.destroyPhone).toBe(true);
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
                        destroyPhone(id: 1)
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe("User not found");
    });

    it('should return an error for "Phone not found"', async () => {

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
                        destroyPhone(id: 1)
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe("Phone not found");
    });
});
