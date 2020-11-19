import {Entity, Column,  PrimaryGeneratedColumn } from 'typeorm';

@Entity( 'adms')

export default class Adms {
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column()
    name : string;

    @Column()
    cnpj: string;

    @Column()
    senha: string;

    @Column()
    email: string;

    @Column()
    cpf: string;


}