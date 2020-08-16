import { 
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import UserEntity from './UserEntity';

@Entity('phones')
export default class PhoneEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    phone!: string;    

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    ////////////////////////////////

    @ManyToOne(() => UserEntity, user => user.phones)
    @JoinColumn()
    user!: UserEntity;    
}