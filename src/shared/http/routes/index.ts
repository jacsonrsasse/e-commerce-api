import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';

const routes = Router();

// Cada módulo terá o seu arquivo de rotas e aqui eles serão importados
routes.use('/products', productsRouter);

export default routes;
