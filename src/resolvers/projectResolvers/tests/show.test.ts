import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import truncateDBTables from '../../../testUtils/truncateDBTables';
import ProjectEntity from '../../../entities/ProjectEntity';

describe('Project Resolver Show test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should return an specific project', async () => {

        const project = ProjectEntity.create({
            title: "titulo p1",
            description: "desc p1"
        });
        await project.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    query {
                        showProject(id: ${project.id}) {
                            id
                            title
                            description
                        }
                    }
                `
            })
        ;

        expect(response.body.data.showProject.id).toBe(`${project.id}`);
        expect(response.body.data.showProject.title).toBe("titulo p1");
        expect(response.body.data.showProject.description).toBe("desc p1");
    });

    it('should return an error for "Project not found"', async () => {

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    query {
                        showProject(id: 1) {
                            id
                        }
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe("Project not found");
    });
});
