import { ValueObjectBase } from "@BuildingBlocks/Domain/ValueObjectsBase";
import { IsString } from "class-validator";

export abstract class TypedIdValueBase extends ValueObjectBase {
    @IsString()
    public readonly Id: string;

    constructor(id: string) {
        super();

        this.Id = id;

        this.ValidateSync();
    }
}