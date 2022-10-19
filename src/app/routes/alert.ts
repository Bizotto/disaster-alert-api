import { Router } from 'express';
import AlertController from '../controllers/AlertController';

const alertRoutes = Router();

alertRoutes.post('/', AlertController.store);
alertRoutes.get('/', AlertController.index);
alertRoutes.get('/:id', AlertController.show);
alertRoutes.patch('/:id', AlertController.update);
alertRoutes.delete('/:id', AlertController.delete);

export { alertRoutes };
