import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controller/ForgotPasswordController';

const passwordsRouter = Router();
const controller = new ForgotPasswordController();

passwordsRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    controller.create,
);

export default passwordsRouter;
