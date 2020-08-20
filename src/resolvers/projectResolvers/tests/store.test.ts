import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import truncateDBTables from '../../../testUtils/truncateDBTables';
import ProjectEntity from '../../../entities/ProjectEntity';

describe('Project Resolver Store test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should store a project', async () => {

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        storeProject(
                            title: "projeto add"
                            description: "desc proj"
                        ) {
                            id
                            title
                            description
                        }
                    }
                `
            })
        ;

        expect(response.body.data.storeProject.title).toBe("projeto add");
        expect(response.body.data.storeProject.description).toBe("desc proj");
    });
});
