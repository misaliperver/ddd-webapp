import { CommandBase } from "@BuildingBlocks/Application/CommandBase";
import { IsNumber, IsString } from "class-validator";

export class AddNewProductCommand extends CommandBase {
    @IsString()
    name: string;

    @IsString()
    brand_id: string;

    @IsNumber()
    price: number;

    constructor(name: string, brand_id: string, price: number) {
        super();
        this.name = name;
        this.price = price;
        this.brand_id = brand_id;
    }
}