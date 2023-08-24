import { EntityBase } from "@BuildingBlocks/Domain/EntityBase";
import { IsInstance, IsString } from "class-validator";
import { GuidGenerator } from "@BuildingBlocks/Common/Utils/GuidGenerator";
import { IAggregateRoot } from "@BuildingBlocks/Domain/IAggregateRoot";
import { MethodSelector } from "@BuildingBlocks/Common/Types/CommonTypes";
import { ProductId } from "./ProductId";
import { ProductBrand, ProductBrandView } from "./ProductBrand";
import { Money } from "./Money";

export type ProductConstructorPayload = {
    Id: ProductId;
    Name: string;
    ProductBrand: ProductBrandView,
    Price: Money,
};

export type CreateNewProductPayload = {
    Name: string;
    ProductBrand: ProductBrandView,
    Price: Money,
};

export type ProductView = MethodSelector<Product>;
export class Product extends EntityBase implements IAggregateRoot {
    @IsInstance(ProductId)
    public readonly Id: ProductId;

    @IsString()
    public Name: string;

    @IsInstance(ProductBrand)
    public ProductBrand: ProductBrandView;

    @IsInstance(Money)
    public Price: Money;

    constructor(payload: ProductConstructorPayload) {
        super();

        this.Id = payload.Id;
        this.Name = payload.Name;
        this.ProductBrand = payload.ProductBrand;
        this.Price = payload.Price;
    }

    public static Create(payload: CreateNewProductPayload) {
        const product = new Product({
            Id: ProductId.Create(GuidGenerator.generate()),
            Name: payload.Name,
            ProductBrand: payload.ProductBrand,
            Price: payload.Price,
        });

        product.ValidateSync();

        return product;
    }

    public EditProductName(Name: string) {
        this.Name = Name;
        this.ValidateSync();
    }

    public EditProductBrand(brand: ProductBrandView) {
        this.ProductBrand = brand;
        this.ValidateSync();
    }
}