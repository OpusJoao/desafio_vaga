import { ApiProperty } from "@nestjs/swagger";

export default class ListCustomersDto{
    @ApiProperty({
        required: false
    })
    document: string;

    @ApiProperty({
        default: 1
    })
    page: number;

    @ApiProperty({
        required: false,
        default: 10
    })
    limit: number;
}