import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Image from './Image'

@Entity('estabelecimentos')
export default class Estabelecimento {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	name: string;

	@Column()
	categoria: number;

	@Column()
	telefone: string;

	@Column()
	cnpj: string;

	@Column()
	latitude: number;

	@Column()
	longitude: number;

	@Column()
	about: string;

	@Column()
	instructions: string;

	@Column()
	opening_hours: string;

	@Column()
	open_on_weekends: boolean;

	@OneToMany(() => Image, image => image.orphanage, { cascade: ['insert', 'update'] })
	@JoinColumn({ name: 'estabelecimento_id' })
	images: Image[];
}