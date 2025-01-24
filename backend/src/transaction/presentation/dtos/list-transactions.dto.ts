import { ApiProperty } from "@nestjs/swagger";

export default class ListTransactionsDto{
    @ApiProperty({
        required: false
    })
    document: string;

    @ApiProperty({
        required: false
    })
    startDate: Date;

    @ApiProperty({
        required: false
    })
    endDate: Date;

    @ApiProperty({
        required: false
    })
    startAmount: Date;

    @ApiProperty({
        required: false
    })
    endAmount: Date;
    
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