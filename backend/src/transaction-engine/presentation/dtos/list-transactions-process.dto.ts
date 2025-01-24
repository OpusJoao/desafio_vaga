import { ApiProperty } from "@nestjs/swagger";

export default class ListTransactionsProcessDto{
    @ApiProperty({
        required: false,
        default: 1
    })
    page: number;

    @ApiProperty({
        required: false
    })
    limit: number;
}