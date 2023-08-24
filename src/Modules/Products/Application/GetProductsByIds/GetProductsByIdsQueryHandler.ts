import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { IProductRepository, ProductRepositoryDIToken } from "@Modules/Products/Domain/Product/IProductRepository";
import { Inject } from "@nestjs/common";
import { ProductView } from "@Modules/Products/Domain/Product/Product";
import { GetProductsByIdsQuery } from "./GetProductsByIdsQuery";
import { ProductDto } from "@Modules/Products/Domain/Product/ProductDto";

@QueryHandler(GetProductsByIdsQuery)
export class GetProductsByIdsQueryHandler implements IQueryHandler<GetProductsByIdsQuery> {
    constructor(
        @Inject(ProductRepositoryDIToken) private readonly productRepository: IProductRepository,
        // @Inject(BrandRepositoryDIToken)private readonly brandRepository: IBrandRepository,
    ) {}

    async execute(query: GetProductsByIdsQuery) {
        const products: ProductView[] = await this.productRepository.findProducts({ productIds: query.productIds }, {});

        return products.map((p) => new ProductDto(p));
    }
}