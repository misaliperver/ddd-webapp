import { EntityBase } from "@BuildingBlocks/Domain/EntityBase";
import { IsInstance, IsString } from "class-validator";
import { GuidGenerator } from "@BuildingBlocks/Common/Utils/GuidGenerator";
import { IAggregateRoot } from "@BuildingBlocks/Domain/IAggregateRoot";
import { MethodSelector } from "@BuildingBlocks/Common/Types/CommonTypes";
import { BrandId } from "./BrandId";

export type BrandConstructorPayload = {
    Id: BrandId;
    Name: string;
};

export type CreateNewBrandPayload = {
    Name: string;
};

export type BrandView = MethodSelector<Brand>;
export class Brand extends EntityBase implements IAggregateRoot {
    @IsInstance(BrandId)
    public readonly Id: BrandId;

    @IsString()
    public Name: string;

    constructor(payload: BrandConstructorPayload) {
        super();

        this.Id = payload.Id;
        this.Name = payload.Name;
    }

    public static Create(payload: CreateNewBrandPayload) {
        const brand = new Brand({
            Id: new BrandId(GuidGenerator.generate()),
            Name: payload.Name,
        });

        brand.ValidateSync();

        return brand;
    }

    public EditBrandName(Name: string) {
        this.Name = Name;
        this.ValidateSync();
    }
}