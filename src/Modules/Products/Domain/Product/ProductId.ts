import { TypedIdValueBase } from "@BuildingBlocks/Domain/TypedIdValueBase";

export class ProductId extends TypedIdValueBase {
    constructor(id: string) {
        super(id);
    }

    public static Create(id: string) {
        return new ProductId(id);
    }
}