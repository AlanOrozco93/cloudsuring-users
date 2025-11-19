import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @Type(() => Number)
  @IsNumber()
  age!: number;

  @IsArray()
  @IsString({ each: true })
  friends!: string[];
}