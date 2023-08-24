import { Optional } from "@BuildingBlocks/Common/Types/CommonTypes";
import { ClassValidationDetails, ClassValidator } from "@BuildingBlocks/Common/Utils/ClassValidator";

export abstract class QueryBase {
    constructor() {}

    public ValidateSync(): void {
        const details: Optional<ClassValidationDetails> = ClassValidator.validateSync(this);

        if (details) {
            throw new Error('Command Validation Error');
        }
    }
}