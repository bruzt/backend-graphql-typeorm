import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

import UserEntity from './UserEntity';
import ProjectEntity from './ProjectEntity';

@Entity('users_projects')
export default class UsersProjectsModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    ///////////////////////////////

    @ManyToOne(() => UserEntity, user => user.usersProjects, { eager: true })
    user!: UserEntity;

    @ManyToOne(() => ProjectEntity, project => project.usersProjects, { eager: true })
    project!: ProjectEntity;
}