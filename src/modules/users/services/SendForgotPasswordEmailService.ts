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
            to: email,
            body: `Solicitação de redefinição de senha recebida: ${userToken?.token}`,
        });
    }
}
