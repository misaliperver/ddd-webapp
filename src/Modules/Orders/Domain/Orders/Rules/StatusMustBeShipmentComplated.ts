import { IBusinessRule } from "@BuildingBlocks/Domain/IBusinessRule";
import { OrderStatus } from "../OrderStatus";
import { BusinessRuleValidationException } from "@BuildingBlocks/Domain/BusinessRuleValidationException";

export class StatusMustBeShipmentComplated implements IBusinessRule {
    Message: string = 'Order Status must be shipment complated';
    Code: number = 20003;

    constructor(
        private Status: OrderStatus,
    ) {}

    IsBroken(): boolean {
        if (this.Status === OrderStatus.shipment_complated) {
            return false;
        }

        return true;
    }

}