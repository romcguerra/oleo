import Estabelecimento from "../models/Estabelecimento"
import imagesView from "./images_view"

export default {
	render(estabelecimento: Estabelecimento) {
		return {
			id: estabelecimento.id,
			categoria: estabelecimento.categoria,
			name: estabelecimento.name,
			telefone: estabelecimento.telefone,
			cnpj: estabelecimento.cnpj,
			latitude: estabelecimento.latitude,
			longitude: estabelecimento.longitude,
			about: estabelecimento.about,
			instructions: estabelecimento.instructions,
			opening_hours: estabelecimento.opening_hours,
			open_on_weekends: estabelecimento.open_on_weekends,
			images: imagesView.renderMany(estabelecimento.images)
		}
	},

	renderMany(estabelecimento: Estabelecimento[]) {
		return estabelecimento.map(estabelecimento => this.render(estabelecimento))
	}
}