import * as _ from 'lodash';
import { Optional } from '@BuildingBlocks/Common/Types/CommonTypes';
import { ClassValidationDetails, ClassValidator } from '@BuildingBlocks/Common/Utils/ClassValidator';

import { IBusinessRule } from '@BuildingBlocks/Domain/IBusinessRule';
import { BusinessRuleValidationException } from '@BuildingBlocks/Domain/BusinessRuleValidationException';
import { ValueObjectValidationRule } from '@BuildingBlocks/Domain/CoreRules/ValueObjectValidationRule';

export abstract class ValueObjectBase {
    protected checkRule(rule: IBusinessRule): void {
        if (rule.IsBroken()) {
            throw new BusinessRuleValidationException(rule);
        }
    }

    public Equals(obj: ValueObjectBase): boolean {
        return _.isEqual(this, obj);
    }
 
    public IsNotEquals(obj: ValueObjectBase): boolean {
        return !_.isEqual(this, obj);
    }

    protected ValidateSync(): void {
        const details: Optional<ClassValidationDetails> = ClassValidator.validateSync(this);
        this.checkRule(new ValueObjectValidationRule(details));
    }
}
