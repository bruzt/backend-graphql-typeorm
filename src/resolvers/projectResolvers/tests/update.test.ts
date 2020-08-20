import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import truncateDBTables from '../../../testUtils/truncateDBTables';
import ProjectEntity from '../../../entities/ProjectEntity';

describe('Project Resolver Update test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should update an project', async () => {

        const project = ProjectEntity.create({
            title: "titulo p1",
            description: "desc p1"
        });
        await project.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        updateProject(
                            id: ${project.id}
                            title: "novo titulo"
                            description: "nova desc"
                        ) {
                           title
                           description
                        }
                    }
                `
            })
        ;

        expect(response.body.data.updateProject.title).toBe("novo titulo");
        expect(response.body.data.updateProject.description).toBe("nova desc");
    });

    it('should return an error for "Project not found"', async () => {

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        updateProject(
                            id: 1
                            title: "novo titulo"
                            description: "nova desc"
                        ) {
                           title
                           description
                        }
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe("Project not found");
    });
});
