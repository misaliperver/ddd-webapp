import { IBusinessRule } from "@BuildingBlocks/Domain/IBusinessRule";
import { OrderStatus } from "../OrderStatus";
import { BusinessRuleValidationException } from "@BuildingBlocks/Domain/BusinessRuleValidationException";

export class CompareShipmentToken implements IBusinessRule {
    Message: string = 'Order ClientInfo must be added';
    Code: number = 20005;

    constructor(
        private token: string,
    ) {}

    IsBroken(): boolean {
        if (this.token === 'Trk5Ldkm4Dmal10Gmllsk+58sld') {
            return false;
        }

        return true;
    }

}