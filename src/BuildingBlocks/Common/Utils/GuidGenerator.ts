import { v4 as uuidv4 } from 'uuid';

export class GuidGenerator {
    public static generate(): string {
        return uuidv4();
    }
}