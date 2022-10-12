import { Exception } from '@shared/errors/Exception';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/email/EtherealMail';
import path from 'path';

interface IRequestForgotPassword {
    email: string;
}

/**
 * Service to create users
 */
export default class SendForgotPasswordEmailService {
    /**
     * Default method
     */
    public async execute({ email }: IRequestForgotPassword): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new Exception('User does not exist.');
        }

        const userToken = await userTokensRepository.generate(user.id);
        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

        await EtherealMail.sendMail({
            to: {
                email,
                name: user.name,
            },
            subject: '[API Vendas] Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${userToken.token}`,
                },
            },
        });
    }
}
