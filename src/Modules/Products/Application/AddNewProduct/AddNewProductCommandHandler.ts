import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AddNewProductCommand } from "./AddNewProductCommand";
import { IProductRepository, ProductRepositoryDIToken } from "@Modules/Products/Domain/Product/IProductRepository";
import { Inject } from "@nestjs/common";
import { BrandRepositoryDIToken, IBrandRepository } from "@Modules/Products/Domain/Brand/IBrandRepository";
import { Product, ProductView } from "@Modules/Products/Domain/Product/Product";
import { Money } from "@Modules/Products/Domain/Product/Money";
import { ProductBrand } from "@Modules/Products/Domain/Product/ProductBrand";


@CommandHandler(AddNewProductCommand)
export class AddNewProductCommandHandler  implements ICommandHandler<AddNewProductCommand>  {
    constructor(
        @Inject(ProductRepositoryDIToken) private readonly productRepository: IProductRepository,
        @Inject(BrandRepositoryDIToken) private readonly brandRepository: IBrandRepository,
    ) {}

    async execute(command: AddNewProductCommand) {
        command.ValidateSync();

        const brand = await this.brandRepository.findBrand(command.brand_id);
        
        if (!brand) {
            throw new Error('Brand not found');
        }

        const product: ProductView = Product.Create({
            Name: command.name,
            ProductBrand: brand,
            Price: Money.Create(command.price),
        })
    
        const { id } =  await this.productRepository.addProduct(product);
    
        return id;
    }
}