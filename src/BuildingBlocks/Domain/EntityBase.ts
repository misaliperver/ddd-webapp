import * as _ from 'lodash';
import { BusinessRuleValidationException } from "@BuildingBlocks/Domain/BusinessRuleValidationException";
import { IBusinessRule } from "@BuildingBlocks/Domain/IBusinessRule";
import { IDomainEvent } from "./IDomainEvent";
import { ClassValidationDetails, ClassValidator } from "@BuildingBlocks/Common/Utils/ClassValidator";
import { Optional } from "@BuildingBlocks/Common/Types/CommonTypes";
import { DomainValidationRule } from "@BuildingBlocks/Domain/CoreRules/DomainValidationRule";

export abstract class EntityBase {
    private _domainEvents: Array<IDomainEvent>;

    protected GetDomainEvents(): Array<IDomainEvent> {
        return _.cloneDeep(this._domainEvents);
    }

    protected AddDomainEvent(domainEvent: IDomainEvent): void {
        this._domainEvents = this._domainEvents ?? new Array<IDomainEvent>();

        this._domainEvents.push(domainEvent);
    }

    public ClearDomainEvents(): void{
        if (this._domainEvents) {
            this._domainEvents = new Array<IDomainEvent>();
        }
    }

    public CheckRule(rule: IBusinessRule): void {
        if (rule.IsBroken()) {
            throw new BusinessRuleValidationException(rule);
        }
    }

    public ValidateSync(): void {
        const details: Optional<ClassValidationDetails> = ClassValidator.validateSync(this);

        this.CheckRule(new DomainValidationRule(details));
    }
}

