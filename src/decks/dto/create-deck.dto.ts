import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateDeckDto {
  @IsString()
  title: string;

  @IsArray()
  @IsOptional()
  cards: { id: string; front: string; back: string }[];
}