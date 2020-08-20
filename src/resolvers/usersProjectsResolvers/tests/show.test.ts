import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import truncateDBTables from '../../../testUtils/truncateDBTables';
import UserEntity from '../../../entities/UserEntity';
import ProjectEntity from '../../../entities/ProjectEntity';
import UsersProjectsEntity from '../../../entities/UsersProjectsEntity';

describe('UserProject Resolver Show test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should return an specific users_projects', async () => {

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
                    query {
                        showUsersProjects(id: ${userProject.id}) {
                            id
                            status
                        }
                    }
                `
            })
        ;

        expect(response.body.data.showUsersProjects.id).toBe(`${userProject.id}`);
    });

    it('should return an error for "UserProject not found"', async () => {

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    query {
                        showUsersProjects(id: 1) {
                            id
                            status
                        }
                    }
                `
            })
        ;

        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe('UserProject not found');
    });
});
