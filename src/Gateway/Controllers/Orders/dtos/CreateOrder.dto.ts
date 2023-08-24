import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({
        type: String,
        description: 'İlgili ürünün idsi girilmedilir.',
        example: '12345',
    })
    @IsNotEmpty()
    @IsString()
    product_id: string;
}