import { IBusinessRule } from "@BuildingBlocks/Domain/IBusinessRule";
import { OrderStatus } from "../OrderStatus";
import { BusinessRuleValidationException } from "@BuildingBlocks/Domain/BusinessRuleValidationException";

export class StatusMustBePaymentComplated implements IBusinessRule {
    Message: string = 'Order Status must be payment complated';
    Code: number = 20002;

    constructor(
        private Status: OrderStatus,
    ) {}

    IsBroken(): boolean {
        if (this.Status === OrderStatus.payment_complated) {
            return false;
        }

        return true;
    }

}