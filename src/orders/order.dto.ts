import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ArrayMinSize,
  IsEmail,
  IsUUID,
} from 'class-validator';
export class OrderDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'user email to communicate order updates' })
  userEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'order shipping address' })
  shippingAddress: string;

  @IsUUID('all', { each: true })
  @ArrayMinSize(1)
  @ApiProperty({ description: 'List of the product ids' })
  products: string[];

  @IsNumber()
  @ApiProperty({ description: 'price of the total order' })
  totalPrice: number;
}
