import { IsString } from 'class-validator';

export class CreateViewDto {
  @IsString()
  deckId: string;

  count: number;
}
