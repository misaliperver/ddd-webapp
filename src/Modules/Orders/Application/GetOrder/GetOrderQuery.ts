import { CommandBase } from "@BuildingBlocks/Application/CommandBase";
import { IsNumber, IsString } from "class-validator";

export class GetOrderQuery extends CommandBase {
    @IsString()
    order_id: string;

    constructor(order_id: string) {
        super();
        this.order_id = order_id;

        this.ValidateSync();
    }
}