import { RepositoryFindOptionsPayload } from "@BuildingBlocks/Infrastructure/IRepostioryOptions";
import { ProductView } from "./Product";

export const ProductRepositoryDIToken = Symbol('ProductRepository');

export interface IProductRepository {
    findProducts(by: { brand_id?: string, productIds?: string[] }, options: RepositoryFindOptionsPayload): Promise<ProductView[]>
    addProduct(product: ProductView): Promise<{id: string}>
}