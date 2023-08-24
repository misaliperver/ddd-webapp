import { QueryBase } from "@BuildingBlocks/Application/QueryBase";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ListProductQuery extends QueryBase {
    @IsOptional()
    @IsString()
    brand_id?: string;

    constructor(brand_id?: string) {
        super();
        this.brand_id = brand_id;

        this.ValidateSync();
    }
}