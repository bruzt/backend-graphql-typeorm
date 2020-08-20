import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import truncateDBTables from '../../../testUtils/truncateDBTables';
import UserEntity from '../../../entities/UserEntity';
import ProjectEntity from '../../../entities/ProjectEntity';
import UsersProjectsEntity from '../../../entities/UsersProjectsEntity';

describe('UserProject Resolver List test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should return an array of users_projects', async () => {

        const user = UserEntity.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();

        const project1 = ProjectEntity.create({
            title: "titulo proj",
            description: "desc proj"
        });
        await project1.save();

        const project2 = ProjectEntity.create({
            title: "titulo proj2",
            description: "desc proj2"
        });
        await project2.save();

        const userProject1 = UsersProjectsEntity.create({
            user,
            project: project1
        }); 
        await userProject1.save();

        const userProject2 = UsersProjectsEntity.create({
            user,
            project: project2
        }); 
        await userProject2.save();

        const response = await supertest(app).post('/graphql')
            .send({
                query: `
                    query {
                        listUsersProjects {
                            id
                            status
                        }
                    }
                `
            })
        ;

        expect(response.body.data.listUsersProjects.length).toBe(2);
    });
});
