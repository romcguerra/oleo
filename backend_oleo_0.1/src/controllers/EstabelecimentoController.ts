import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import Estabelecimento from '../models/Estabelecimento'
import estabelecimento_view from '../view/estabelecimentos_view'

export default {
	async create(request: Request, response: Response) {
		const { name, categoria, telefone, cnpj, latitude, longitude, about, instructions, opening_hours, open_on_weekends } = request.body
		const requestImages = request.files as Express.Multer.File[]

		const images = requestImages.map(image => ({ ...image, path: image.filename }))

		const estabelecimentoRepository = getRepository(Estabelecimento)

		const data = {
			name, categoria, telefone, cnpj, latitude, longitude, about, instructions, opening_hours,
			open_on_weekends: open_on_weekends === 'true', images
		}

		const schema = Yup.object().shape({
			name: Yup.string().required('O campo "name" é obrigatório.'),
			categoria: Yup.number().required('O campo "categoria" é obrigatório.'),
			telefone: Yup.string().required('O campo "telefone" é obrigatório.'),
			cnpj: Yup.string().required('O campo "cnpj" é obrigatório.'),
			latitude: Yup.number().required('O campo "latitude" é obrigatório.'),
			longitude: Yup.number().required('O campo "longitude" é obrigatório.'),
			about: Yup.string().required('O campo "about" é obrigatório.').max(300, 'O campo "about" aceita até 300 caracteres.'),
			instructions: Yup.string().required('O campo "instructions" é obrigatório.'),
			opening_hours: Yup.string().required('O campo "opening_hours" é obrigatório.'),
			open_on_weekends: Yup.boolean().required('O campo "open_on_weekends" é obrigatório.'),
			images: Yup.array(
				Yup.object().shape({
					path: Yup.string().required('O campo "path" é obrigatório.')
				}))
		})

		await schema.validate(data, { abortEarly: false })

		const estabelecimento = estabelecimentoRepository.create(data)

		await estabelecimentoRepository.save(estabelecimento)

		return response.status(201).json(estabelecimento)
	},

	async index(request: Request, response: Response) {
		const estabelecimentoRepository = getRepository(Estabelecimento)

		const estabelecimentos = await estabelecimentoRepository.find({ relations: ['images'] })

		return response.json(estabelecimento_view.renderMany(estabelecimentos))
	},

	async show(request: Request, response: Response) {
		const { id } = request.params
		const estabelecimentoRepository = getRepository(Estabelecimento)

		const estabelecimento = await estabelecimentoRepository.findOneOrFail(id, { relations: ['images'] })

		return response.json(estabelecimento_view.render(estabelecimento))
	}
}