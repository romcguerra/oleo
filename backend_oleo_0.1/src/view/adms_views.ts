import Adms from '../models/Adms';

export default{
    render(adm: Adms){
        return{
            name: adm.name,
            senha: adm.senha,
            email: adm.email,
            cnpj: adm.cnpj,
            cpf: adm.cpf
        };
    },
    renderMany(adms: Adms[]){
        return adms.map(adm => this.render(adm))
    }
};