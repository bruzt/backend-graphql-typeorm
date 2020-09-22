import { 
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToOne, 
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import UserEntity from './UserEntity';

@Entity('address')
export default class AddressEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    street!: string;    

    @Column()
    number?: string; 
    
    @Column()
    neighborhood!: string;    

    @Column()
    city!: string;    

    @Column()
    uf!: string;    

    @Column()
    zipcode!: string;    

    @Column()
    userId!: number;  

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    ////////////////////////////////////

    @OneToOne(() => UserEntity, user => user.address)
    @JoinColumn()
    user!: UserEntity;
}