import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateProduct {
    @ApiProperty({
        type: String,
        description: 'Brand id değeri girilmelidir.',
        example: '12345',
    })
    @IsNotEmpty()
    @IsString()
    brand_id: string

    @ApiProperty({
        type: String,
        description: 'Ürün ismi girilmelidir.',
        example: 'E200',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        description: 'Ürün fiyatı girilmelidir.',
        example: 10000,
    })
    @IsNotEmpty()
    @IsNumber()
    price: number;
}