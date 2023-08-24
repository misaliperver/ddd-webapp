import { Optional } from "@BuildingBlocks/Common/Types/CommonTypes";
import { ClassValidationDetails } from "@BuildingBlocks/Common/Utils/ClassValidator";
import { IBusinessRule } from "@BuildingBlocks/Domain/IBusinessRule";

export class ValueObjectValidationRule implements IBusinessRule {
  Message: string = 'ValueObject validation error.';
  Code: number = 1001;

  private details: Optional<ClassValidationDetails>;

  constructor(details: Optional<ClassValidationDetails>) {
    this.details = details;
  }

  IsBroken(): boolean {
    return this.details ? true : false;
  }
}

