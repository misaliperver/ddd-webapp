import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class ClientInfoDto {
    @ApiProperty({
        type: String,
        description: 'Sipariş numarası girilmelidir..',
        example: 'fatih',
    })
    @IsNotEmpty()
    @IsString()
    order_id: string;

    @ApiProperty({
        type: String,
        description: 'Müşteri adı girilmelidir.',
        example: 'fatih',
    })
    @IsNotEmpty()
    @IsString()
    client_name: string;

    @ApiProperty({
        type: String,
        description: 'Müşteri adresi girilmelidir.',
        example: 'istanbul',
    })
    @IsNotEmpty()
    @IsString()
    client_address: string;
}