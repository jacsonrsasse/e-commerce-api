import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordsRouter from '@modules/users/routes/passwords.routes';

const routes = Router();

// Cada módulo terá o seu arquivo de rotas e aqui eles serão importados
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordsRouter);

export default routes;
