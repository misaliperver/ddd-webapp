import { CommandBase } from "@BuildingBlocks/Application/CommandBase";
import { IsNumber, IsString } from "class-validator";

export class ComplateCommand extends CommandBase {
    @IsString()
    orderId: string;

    @IsString()
    token: string;

    constructor(orderId: string, token: string) {
        super();

        this.orderId = orderId;
        this.token = token;

        this.ValidateSync();
    }
}