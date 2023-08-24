import { TypedIdValueBase } from "@BuildingBlocks/Domain/TypedIdValueBase";

export class BrandId extends TypedIdValueBase {
    constructor(id: string) {
        super(id);
    }

    public static Create(id: string) {
        return new BrandId(id);
    }
}