import { Optional } from "@BuildingBlocks/Common/Types/CommonTypes";
import { ClassValidationDetails, ClassValidator } from "@BuildingBlocks/Common/Utils/ClassValidator";
import { GuidGenerator } from "@BuildingBlocks/Common/Utils/GuidGenerator";
import { IsDate, IsString } from "class-validator";

export abstract class CommandBase {
    @IsString()
    CommandId: string;

    @IsDate()
    OccuredAt: Date;

    constructor() {
        this.CommandId = GuidGenerator.generate();
        this.OccuredAt = new Date();
    }

    public ValidateSync(): void {
        const details: Optional<ClassValidationDetails> = ClassValidator.validateSync(this);

        if (details) {
            throw new Error('Command Validation Error');
        }
    }
}