import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
    /**
     * Finds a User by his name
     * @param name
     */
    public async findByName(name: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                name,
            },
        });
        return user;
    }

    /**
     * Finds a User by his ID
     * @param id
     */
    public async findById(id: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                id,
            },
        });
        return user;
    }

    /**
     * Finds a User by his e-mail address
     * @param email
     */
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                email,
            },
        });
        return user;
    }
}
