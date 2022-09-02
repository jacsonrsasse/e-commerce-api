import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controller/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controller/UserAvatarController';

const usersRouter = Router();
const controller = new UsersController();
const avatarController = new UserAvatarController();

const multerMiddleware = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, controller.index);

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

/**
 * Essa rota é exclusiva para a atualização de avatar,
 * usando o middleware de validação de usuário autenticado e um
 * middleware do próprio multer que já faz as validações necessárias
 */
usersRouter.patch('/avatar', isAuthenticated, multerMiddleware.single('avatar'), avatarController.update);

export default usersRouter;
