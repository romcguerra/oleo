import { Router } from 'express'
import multer from 'multer'

import AdmsControllers from './controllers/AdmsControllers';
import UsersControllers from './controllers/UsersControllers';
import EstabelecimentoController from './controllers/EstabelecimentoController'
import multerConfig from './config/multer'

const routes = Router()
const upload = multer(multerConfig)



routes.post('/estabelecimentos', upload.array('images'), EstabelecimentoController.create);
routes.get('/estabelecimentos', EstabelecimentoController.index);
routes.get('/estabelecimentos/:id', EstabelecimentoController.show);
routes.post('/estabelecimentos', AdmsControllers.create);
routes.get('/estabelecimentos', AdmsControllers.index);
routes.get('/estabelecimentos/:id', AdmsControllers.show);
routes.post('/estabelecimentos', UsersControllers.create);
routes.get('/estabelecimentos', UsersControllers.index);
routes.get('/estabelecimentos/:id', UsersControllers.show);

export default routes