import { 
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from "typeorm";

import UsersProjectsEntity from './UsersProjectsEntity';

@Entity('projects')
export default class ProjectModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    ///////////////////////////////////

    @OneToMany(() => UsersProjectsEntity, usersProjects => usersProjects.project)
    usersProjects?: UsersProjectsEntity[];
}
