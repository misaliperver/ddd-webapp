import { EntityBase } from "@BuildingBlocks/Domain/EntityBase";
import { MethodSelector } from "@BuildingBlocks/Common/Types/CommonTypes";
import { Money } from "./Money";
import { CreateNewBrandPayload } from "@Modules/Products/Domain/Product/ProductBrand";
import { IsInstance, IsString } from "class-validator";
import { ValueObjectBase } from "@BuildingBlocks/Domain/ValueObjectsBase";

export type OrderItemConstructorPayload = {
    Id: string;
    Name: string;
    Price: Money,
};

export type OrderItemView = OrderItem;
export class OrderItem extends ValueObjectBase {
    @IsString()
    Id: string;

    @IsString()
    Name: string;

    @IsInstance(Money)
    Price: Money;

    constructor(payload: OrderItemConstructorPayload) {
        super();

        this.Id = payload.Id;
        this.Name = payload.Name;
        this.Price = payload.Price;
    }

    public static Create(payload: OrderItemConstructorPayload) {
        const productBrand = new OrderItem({
            Id: payload.Id,
            Name: payload.Name,
            Price: payload.Price,
        });

        productBrand.ValidateSync();

        return productBrand;
    }
}