import { Router } from 'express';
import { alertRoutes } from './alert';

const routes = Router();
routes.use('/alerts', alertRoutes);

export { routes };
