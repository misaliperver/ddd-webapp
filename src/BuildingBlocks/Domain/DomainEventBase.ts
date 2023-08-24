import { GuidGenerator } from "@BuildingBlocks/Common/Utils/GuidGenerator";
import { IDomainEvent } from "@BuildingBlocks/Domain/IDomainEvent";

export abstract class DomainEventBase implements IDomainEvent {
    public readonly Id: string;
    public readonly OccurredOn: Date;

    constructor() {
        this.Id = GuidGenerator.generate();
        this.OccurredOn = new Date();
    }
}