import { QueryBase } from "@BuildingBlocks/Application/QueryBase";
import { IsArray } from "class-validator";

export class GetProductsByIdsQuery extends QueryBase {
    @IsArray()
    productIds: string[];

    constructor(productIds: string[]) {
        super();
        this.productIds = productIds;

        this.ValidateSync();
    }
}