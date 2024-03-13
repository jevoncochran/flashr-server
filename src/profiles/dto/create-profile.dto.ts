import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
