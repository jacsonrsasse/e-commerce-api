import { hash } from 'bcryptjs';

interface IHashPassword {
    passwordToHash: string;
}

/**
 * Hashs a password
 */
export default class HashPasswordService {
    public async execute({ passwordToHash }: IHashPassword): Promise<string> {
        const hashedPassword = await hash(passwordToHash, 8);
        return hashedPassword;
    }
}
