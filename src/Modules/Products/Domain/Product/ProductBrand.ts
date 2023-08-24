import { EntityBase } from "@BuildingBlocks/Domain/EntityBase";
import { IsInstance, IsString } from "class-validator";
import { GuidGenerator } from "@BuildingBlocks/Common/Utils/GuidGenerator";
import { IAggregateRoot } from "@BuildingBlocks/Domain/IAggregateRoot";
import { MethodSelector } from "@BuildingBlocks/Common/Types/CommonTypes";
import { BrandId } from "../Brand/BrandId";

export type BrandConstructorPayload = {
    Id: BrandId;
    Name: string;
};

export type CreateNewBrandPayload = {
    Id: BrandId;
    Name: string;
};

export type ProductBrandView = MethodSelector<ProductBrand>;
export class ProductBrand extends EntityBase implements IAggregateRoot {
    @IsInstance(BrandId)
    public readonly Id: BrandId;

    @IsString()
    public readonly Name: string;

    constructor(payload: BrandConstructorPayload) {
        super();

        this.Id = payload.Id;
        this.Name = payload.Name;
    }

    public static Create(payload: CreateNewBrandPayload) {
        const productBrand = new ProductBrand({
            Id: payload.Id,
            Name: payload.Name,
        });

        productBrand.ValidateSync();

        return productBrand;
    }
}