import { Money } from "@Modules/Orders/Domain/Orders/Money";
import { OrderItem } from "@Modules/Orders/Domain/Orders/OrderItem";
import { GetProductsByIdsQuery } from "@Modules/Products/Application/GetProductsByIds/GetProductsByIdsQuery";
import { ProductDto } from "@Modules/Products/Domain/Product/ProductDto";
import { Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";

@Injectable()
export class ProductService {
    constructor(
        private readonly queryBus: QueryBus,
    ) {}

    async getProduct(ids: string[]): Promise<OrderItem[]> {
        const products = await this.queryBus.execute(new GetProductsByIdsQuery(ids));

        return products.map((p: ProductDto) => {
            return OrderItem.Create({
                Id: p.Id,
                Name: p.Name,
                Price: Money.Create(p.Price),
            })
        })
    }
}