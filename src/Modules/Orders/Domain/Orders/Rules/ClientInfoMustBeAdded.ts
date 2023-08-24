import { IBusinessRule } from "@BuildingBlocks/Domain/IBusinessRule";
import { OrderStatus } from "../OrderStatus";
import { BusinessRuleValidationException } from "@BuildingBlocks/Domain/BusinessRuleValidationException";

export class ClientInfoMustBeAdded implements IBusinessRule {
    Message: string = 'Order ClientInfo must be added';
    Code: number = 20005;

    constructor(
        private clientName: string,
        private clientAddress: string,
    ) {}

    IsBroken(): boolean {
        if (this.clientName && this.clientAddress) {
            return false;
        }

        return true;
    }

}