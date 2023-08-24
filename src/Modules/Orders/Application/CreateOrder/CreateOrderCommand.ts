import { CommandBase } from "@BuildingBlocks/Application/CommandBase";
import { IsNumber, IsString } from "class-validator";

export class CreateOrderCommand extends CommandBase {
    @IsString()
    product_id: string;

    constructor(product_id: string) {
        super();
        this.product_id = product_id;

        this.ValidateSync();
    }
}