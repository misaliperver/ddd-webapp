import { ValueObjectBase } from "@BuildingBlocks/Domain/ValueObjectsBase";


export type MoneyConstructorPayload = {
    Value: number;
};

export class Money extends ValueObjectBase {
    public readonly Value: number
    
    constructor(Value: number) {
        super();

        this.Value = Value;
    }

    public static Create(Value: number) {
        const product = new Money(Value);

        product.ValidateSync();

        return product;
    }


}