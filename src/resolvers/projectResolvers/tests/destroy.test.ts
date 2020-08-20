import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import truncateDBTables from '../../../testUtils/truncateDBTables';
import ProjectEntity from '../../../entities/ProjectEntity';

describe('Project Resolver Destroy test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should delete a project', async () => {

        const project = ProjectEntity.create({
            title: "titulo p1",
            description: "desc p1"
        });
        await project.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        destroyProject(id: ${project.id})
                    }
                `
            })
        ;

        expect(response.body.data.destroyProject).toBe(true);
    });

    it('should return an error for "Project not found"', async () => {

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        destroyProject(id: 1)
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe("Project not found");
    });
});
