import { IBusinessRule } from "@BuildingBlocks/Domain/IBusinessRule";
import { OrderStatus } from "../OrderStatus";
import { BusinessRuleValidationException } from "@BuildingBlocks/Domain/BusinessRuleValidationException";

export class StatusMustBeCreated implements IBusinessRule {
    Message: string = 'Order Status must be created';
    Code: number = 20001;

    constructor(
        private Status: OrderStatus,
    ) {}

    IsBroken(): boolean {
        if (this.Status === OrderStatus.created) {
            return false;
        }

        return true;
    }

}