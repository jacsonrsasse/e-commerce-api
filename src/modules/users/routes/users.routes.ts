import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controller/UsersController';

const usersRouter = Router();
const controller = new UsersController();

usersRouter.get('/', controller.index);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    controller.create,
);

export default usersRouter;
