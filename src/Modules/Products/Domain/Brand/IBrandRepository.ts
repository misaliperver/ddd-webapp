import { RepositoryFindOptionsPayload } from "@BuildingBlocks/Infrastructure/IRepostioryOptions";
import { BrandView } from "./Brand";

export const BrandRepositoryDIToken = Symbol('BrandRepository');

export interface IBrandRepository {
    findBrand(brand_id: string): Promise<BrandView>
    findBrands(by: { }, options: RepositoryFindOptionsPayload): Promise<BrandView[]>
    addBrand(brand: BrandView): Promise<{id: string}>
}