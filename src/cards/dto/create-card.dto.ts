import { IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  front: string;

  @IsString()
  back: string;

  @IsString()
  deckId: string;
}
