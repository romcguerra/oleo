import { Request, Response } from 'express';
import {getRepository} from 'typeorm';
import Users from '../models/Users';
import usersViews from '../view/users_views';
import * as Yup from 'yup';

export default{
    async index(request: Request, response: Response){
        const usersRepository = getRepository(Users);

        const users = await usersRepository.find();

        return response.json(usersViews.renderMany(users));
    },

    async show(request: Request, response: Response){
        const {id} = request.params;

        const usersRepository = getRepository(Users);

        const user = await usersRepository.findOneOrFail(id);

        return response.json(usersViews.render(user));
    },


    async create(request: Request, response: Response){
        const{
             name,
             telefone,
             senha,
             email,
             latitude,
             longitude,
     
         } = request.body;
     
         const usersRepository = getRepository(Users);

         const data = {
            name,
            telefone,
            senha,
            email,
            latitude,
            longitude,
        }

        const schema =Yup.object().shape({
            name: Yup.string().required(),
            telefone: Yup.string().required(),
            senha: Yup.string().required(),
            email: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),

        });

        await schema.validate(data, {
            abortEarly: false,
        });
     
         const users = usersRepository.create(data);
     
         await usersRepository.save(users);
     
         return response.status(201).json(users);
    }
}