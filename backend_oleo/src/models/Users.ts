import {Entity, Column,  PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')

export default class Users {
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column()
    name : string;

    @Column()
    telefone: string;

    @Column()
    senha: string;

    @Column()
    email: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

}