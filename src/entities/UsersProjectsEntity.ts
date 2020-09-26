import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
} from 'typeorm';

import UserEntity from './UserEntity';
import ProjectEntity from './ProjectEntity';

@Entity('users_projects')
export default class UsersProjectsEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    status!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @Column()
    userId!: number;

    @Column()
    projectId!: number;

    ///////////////////////////////

    @ManyToOne(() => UserEntity, user => user.usersProjects)
    user!: UserEntity;

    @ManyToOne(() => ProjectEntity, project => project.usersProjects)
    project!: ProjectEntity;
}