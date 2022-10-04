import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controller/ForgotPasswordController';
import ResetPasswordController from '../controller/ResetPasswordController';

const passwordsRouter = Router();
const forgorController = new ForgotPasswordController();
const resetController = new ResetPasswordController();

passwordsRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    forgorController.create,
);

passwordsRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            // Validação para garantir que ambos os campos estejam com a mesma informação
            password_confirmation: Joi.string().required().valid(Joi.ref('password')),
        },
    }),
    resetController.create,
);

export default passwordsRouter;
