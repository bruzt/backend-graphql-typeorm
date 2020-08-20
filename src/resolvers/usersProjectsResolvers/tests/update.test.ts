import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import truncateDBTables from '../../../testUtils/truncateDBTables';
import UserEntity from '../../../entities/UserEntity';
import ProjectEntity from '../../../entities/ProjectEntity';
import UsersProjectsEntity from '../../../entities/UsersProjectsEntity';

describe('UserProject Resolver Update test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should update a users_projects', async () => {

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
            project: project
        }); 
        await userProject.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        updateUserProject(
                            id: ${userProject.id}
                            status: "stopped"
                        ) {
                            id
                            status
                        }
                    }
                `
            })
        ;

        expect(response.body.data.updateUserProject.id).toBe(`${userProject.id}`);
        expect(response.body.data.updateUserProject.status).toBe('stopped');
    });

    it('should return an error for "UserProject not found"', async () => {

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    mutation {
                        updateUserProject(
                            id: 1
                            status: "stopped"
                        ) {
                            id
                            status
                        }
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe("UserProject not found");
    });
});
