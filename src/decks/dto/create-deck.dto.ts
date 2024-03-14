import { IsString } from 'class-validator';

export class CreateDeckDto {
  @IsString()
  title: string;
}
