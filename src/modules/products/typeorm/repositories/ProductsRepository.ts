import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

/**
 * Repositório customizado, explicitando que ele gerencia
 * a entidade de Produto
 */
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    /**
     * Encontra um produto a partir do nome dele
     * @param name Nome do produto desejado
     * @returns Objeto contendo os dados do produto, ou undefined
     */
    public async findByName(name: string): Promise<Product | undefined> {
        const product = this.findOne({
            where: {
                name,
            },
        });
        return product;
    }
}
