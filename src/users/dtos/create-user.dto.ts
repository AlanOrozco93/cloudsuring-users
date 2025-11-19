import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateUserDto {
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