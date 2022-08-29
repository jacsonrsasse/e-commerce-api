import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';

const routes = Router();

// Cada módulo terá o seu arquivo de rotas e aqui eles serão importados
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

export default routes;
