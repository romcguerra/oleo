import { Request, Response } from 'express';
import {getRepository} from 'typeorm';
import Adms from '../models/Adms';
import admViews from '../view/adms_views';
import * as Yup from 'yup';

export default{
    async index(request: Request, response: Response){
        const admsRepository = getRepository(Adms);

        const adms = await admsRepository.find();

        return response.json(admViews.renderMany(adms));
    },

    async show(request: Request, response: Response){
        const {id} = request.params;

        const admsRepository = getRepository(Adms);

        const adm = await admsRepository.findOneOrFail(id);

        return response.json(admViews.render(adm));
    },

    async create(request: Request, response: Response){
        const{
          
             name,
             senha,
             email,
             cnpj,
             cpf,
     
         } = request.body;
     
         const admsRepository = getRepository(Adms);

         const data = {
            name,
            senha,
            email,
            cnpj,
            cpf,
        }

        const schema =Yup.object().shape({
            name: Yup.string().required(),
            senha: Yup.string().required(),
            email: Yup.string().required(),
            cnpj: Yup.string().required(),
            cpf: Yup.string().required(),

        });

        await schema.validate(data, {
            abortEarly: false,
        });
     
         const adms = admsRepository.create(data);
     
         await admsRepository.save(adms);
     
         return response.status(201).json(adms);
    }
};