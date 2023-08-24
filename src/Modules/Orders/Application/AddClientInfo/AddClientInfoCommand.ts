import { CommandBase } from "@BuildingBlocks/Application/CommandBase";
import { IsNumber, IsString } from "class-validator";

export class AddClientInfoCommand extends CommandBase {
    @IsString()
    orderId: string;

    @IsString()
    clientAddress: string;

    @IsString()
    clientName: string;

    constructor(orderId: string, clientName: string, clientAddress: string) {
        super();

        this.orderId = orderId;
        this.clientAddress = clientName;
        this.clientName = clientAddress;

        this.ValidateSync();
    }
}