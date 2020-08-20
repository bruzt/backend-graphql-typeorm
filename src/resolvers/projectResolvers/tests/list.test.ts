import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import truncateDBTables from '../../../testUtils/truncateDBTables';
import ProjectEntity from '../../../entities/ProjectEntity';

describe('Project Resolver List test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should return an array of projects', async () => {

        const project1 = ProjectEntity.create({
            title: "titulo p1",
            description: "desc p1"
        });
        await project1.save();

        const project2 = ProjectEntity.create({
            title: "titulo p2",
            description: "desc p2"
        });
        await project2.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    query {
                        listProjects {
                            id
                        }
                    }
                `
            })
        ;

        expect(response.body.data.listProjects.length).toBe(2);
    });
});
