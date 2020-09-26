import { Request } from 'express';

import connection from '../../database/connection';
import UserEntity from '../../entities/UserEntity';
import truncateDBTables from '../../testUtils/truncateDBTables';
import checkHeadersAuthorization from '../checkHeadersAuthorization';

describe('Utils checkHeadersAuthorization test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should authenticate and return a JWT', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();
        const jwt = user.generateJwt();

        const req: Request = {
            headers: {
                authorization: `Bearer ${jwt.token}`
            }
        } as any;

        const tokenPayload = checkHeadersAuthorization(req);

        expect(tokenPayload.userId).toBe(user.id);
    });

    it('should not authenticate for missing authentication headers', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();

        const req: Request = {
            headers: {}
        } as any;

        try {
            
            checkHeadersAuthorization(req);

        } catch (error) {
            expect(error.name).toBe("UserInputError");
            expect(error.message).toBe("Not authorized, invalid Bearer Token");
        }
    });

    it('should not authenticate for bearer token bad formatted, missing "Bearer"', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();
        const jwt = user.generateJwt();

        const req: Request = {
            headers: {
                authorization: `${jwt.token}`
            }
        } as any;

        try {
            
            checkHeadersAuthorization(req);

        } catch (error) {
            expect(error.name).toBe("UserInputError");
            expect(error.message).toBe("Not authorized, invalid Bearer Token");
        }
    });

    it('should not authenticate for bearer token bad formatted, token with small length', async () => {

        const req: Request = {
            headers: {
                authorization: `Bearer as5f14a561fs65`
            }
        } as any;

        try {
            
            checkHeadersAuthorization(req);

        } catch (error) {
            expect(error.name).toBe("UserInputError");
            expect(error.message).toBe("Not authorized, invalid Bearer Token");
        }
    });

    it('should not authenticate for invalid token', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();
        const jwt = user.generateJwt();

        const req: Request = {
            headers: {
                authorization: `Bearer ${jwt.token}a`
            }
        } as any;

        try {
            
            checkHeadersAuthorization(req);

        } catch (error) {
            expect(error.name).toBe("UserInputError");
            expect(error.message).toBe("Not authorized, invalid Bearer Token");
        }
    });
});
