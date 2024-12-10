import { IsString, IsNotEmpty } from 'class-validator';

export class LikeThreadDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
