import { IBusinessRule } from "@BuildingBlocks/Domain/IBusinessRule";
import { OrderStatus } from "../OrderStatus";
import { BusinessRuleValidationException } from "@BuildingBlocks/Domain/BusinessRuleValidationException";

export class StatusMustBeShipmentWaiting implements IBusinessRule {
    Message: string = 'Order Status must be waiting shipment';
    Code: number = 20004;

    constructor(
        private Status: OrderStatus,
    ) {}

    IsBroken(): boolean {
        if (this.Status === OrderStatus.waiting_shipment) {
            return false;
        }

        return true;
    }

}