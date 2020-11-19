import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Orphanage from './Estabelecimento'

@Entity('images')
export default class Image {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column()
	path: string

	@ManyToOne(() => Orphanage, orphanage => orphanage.images)
	@JoinColumn({ name: 'estabelecimento_id' })
	orphanage: Orphanage
}