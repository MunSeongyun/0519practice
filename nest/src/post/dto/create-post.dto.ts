import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the post',
    example: 'My First Post',
  })
  title: string;
  @IsString()
  @ApiProperty({
    description: 'The content of the post',
    example: 'This is the content of my first post.',
  })
  content: string;
  @IsString()
  @ApiProperty({
    description: 'The author of the post',
    example: 'John Doe',
  })
  author: string;
}
