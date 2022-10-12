import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import ProfileController from '../controller/ProfileController';

const profileRouter = Router();
const controller = new ProfileController();

/**
 * Assim o middleware é aplicado a todas as rotas desse objeto,
 * sendo chamado antes de qualquer coisa
 */
profileRouter.use(isAuthenticated);

profileRouter.get('/', controller.show);
profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string().optional(),
            password_confirmation: Joi.string().valid(Joi.ref('password')).when('password', {
                is: Joi.exist(),
                then: Joi.required(),
            }),
        },
    }),
    controller.update,
);

export default profileRouter;
