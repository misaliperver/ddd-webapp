import { TypedIdValueBase } from "@BuildingBlocks/Domain/TypedIdValueBase";

export class OrderId extends TypedIdValueBase {
    constructor(id: string) {
        super(id);
    }

    public static Create(id: string) {
        return new OrderId(id);
    }
}