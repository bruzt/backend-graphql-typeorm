import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import truncateDBTables from '../../../testUtils/truncateDBTables';
import UserEntity from '../../../entities/UserEntity';
import ProjectEntity from '../../../entities/ProjectEntity';
import UsersProjectsEntity from '../../../entities/UsersProjectsEntity';

describe('UserProject Resolver Store test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should store a users_projects', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();

        const project = ProjectEntity.create({
            title: "titulo proj",
            description: "desc proj"
        });
        await project.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        storeUserProject(
                            userId: ${user.id}
                            projectId: ${project.id}
                        ) {
                            id
                            status
                        }
                    }
                `
            })
        ;

        expect(response.body.data.storeUserProject).toHaveProperty('id');
        expect(response.body.data.storeUserProject).toHaveProperty('status');
    });

    it('should return an error for "User not found"', async () => {

        const project = ProjectEntity.create({
            title: "titulo proj",
            description: "desc proj"
        });
        await project.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        storeUserProject(
                            userId: 1
                            projectId: ${project.id}
                        ) {
                            id
                            status
                        }
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe('User not found');
    });

    it('should return an error for "Project not found"', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        storeUserProject(
                            userId: ${user.id}
                            projectId: 1
                        ) {
                            id
                            status
                        }
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe('Project not found');
    });

    it('should return an error for "User already assign to this project"', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();

        const project = ProjectEntity.create({
            title: "titulo proj",
            description: "desc proj"
        });
        await project.save();

        const userProject = UsersProjectsEntity.create({
            user,
            project
        });
        await userProject.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        storeUserProject(
                            userId: ${user.id}
                            projectId: ${project.id}
                        ) {
                            id
                            status
                        }
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe('User already assign to this project');
    });
});
