import PhoneEntity from '../../entities/PhoneEntity';

export interface IStorePhone {
    userId: number;
    phone: string;
}

export default function list({
    userId,
    phone,
}: IStorePhone){

    const newPhone = PhoneEntity.create({
        user: userId as any,
        phone,
    });
    
    return newPhone.save();
}
