import { Exception } from '@shared/errors/Exception';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/email/EtherealMail';

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

        await EtherealMail.sendMail({
            to: {
                email,
                name: user.name,
            },
            subject: '[API Vendas] Recuperação de Senha',
            templateData: {
                template: `Olá {{name}}: {{token}}`,
                variables: {
                    name: user.name,
                    token: userToken.token,
                },
            },
        });
    }
}
