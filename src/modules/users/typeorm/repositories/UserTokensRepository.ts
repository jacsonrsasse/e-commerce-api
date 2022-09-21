import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
export default class UserTokensRepository extends Repository<UserToken> {
    /**
     * Finds a User's Token by his token
     * @param token
     */
    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.findOne({
            where: {
                token,
            },
        });
        return userToken;
    }

    /**
     * Finds a User by his ID
     * @param user_id
     */
    public async generate(user_id: string): Promise<UserToken | undefined> {
        const userToken = await this.create({
            user_id,
        });

        await this.save(userToken);

        return userToken;
    }
}
