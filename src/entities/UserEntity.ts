import { 
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, OneToMany, 
    BeforeInsert, 
    BeforeUpdate, 
    AfterLoad, 
    CreateDateColumn, 
    UpdateDateColumn,
    OneToOne,
    DeleteDateColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import AddressEntity from './AddressEntity';
import PhoneEntity from './PhoneEntity';
import UsersProjectsEntity from './UsersProjectsEntity';

@Entity('users')
export default class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;    

    @Column()
    email!: string;

    @Column()
    password!: string;
    
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
    
    private tempPassword?: string;

    ////////////////////////////////////
    
    @AfterLoad()
    private async loadPassword(){

        this.tempPassword = this.password;
    }
    
    @BeforeInsert()
    @BeforeUpdate()
    private async hashPassword(){
        if(this.tempPassword !== this.password){
            this.password = await bcrypt.hash(this.password, 8);
        }
    }
    
    checkPassword(password: string){
        return bcrypt.compare(password, this.password);
    }    

    generateJwt(){
        return { token: jwt.sign({ id: this.id }, process.env.APP_SECRET as string, { expiresIn: '12h' }) };
    }

    ///////////////////////////////////////

    @OneToOne(() => AddressEntity, address => address.user)
    address?: AddressEntity;

    @OneToMany(() => PhoneEntity, phone => phone.user)
    phones?: PhoneEntity[];
    
    @OneToMany(() => UsersProjectsEntity, usersProjects => usersProjects.user)
    usersProjects?: UsersProjectsEntity[];
}