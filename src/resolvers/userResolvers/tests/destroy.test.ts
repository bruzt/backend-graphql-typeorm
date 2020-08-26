import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserEntity from '../../../entities/UserEntity';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('User Resolver Destroy test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should soft delete an user', async () => {

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
                        destroyUser
                    }
                `
            })
        ;

        const deletedUser = await UserEntity.findOne({ id: user.id }, { withDeleted: true });
        
        expect(response.body.data.destroyUser).toBe(true);
        expect(deletedUser?.deletedAt).not.toBeNull();
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
                        destroyUser
                    }
                `
            })
        ;
        
        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0]).toHaveProperty('message');
        expect(response.body.errors[0].message).toBe('User not found');
    });
});
