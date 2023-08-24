import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { IProductRepository, ProductRepositoryDIToken } from "@Modules/Products/Domain/Product/IProductRepository";
import { Inject } from "@nestjs/common";
import { ProductView } from "@Modules/Products/Domain/Product/Product";
import { ListProductQuery } from "./ListProductQuery";
import { ProductDto } from "@Modules/Products/Domain/Product/ProductDto";

@QueryHandler(ListProductQuery)
export class ListProductQueryHandler implements IQueryHandler<ListProductQuery> {
    constructor(
        @Inject(ProductRepositoryDIToken) private readonly productRepository: IProductRepository,
        // @Inject(BrandRepositoryDIToken)private readonly brandRepository: IBrandRepository,
    ) {}

    async execute(query: ListProductQuery) {
        const products: ProductView[] = await this.productRepository.findProducts({ brand_id: query.brand_id }, {});

        return products.map((p) => new ProductDto(p));
    }
}