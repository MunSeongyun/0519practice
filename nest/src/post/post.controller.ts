import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    summary: '새 게시글 생성',
    description: '제공된 데이터로 새로운 게시글을 생성합니다.',
  })
  @ApiBody({
    type: CreatePostDto,
  })
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto);
  }

  @ApiOperation({
    summary: '모든 게시글 조회',
    description: '데이터베이스에서 모든 게시글을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '모든 게시글 목록',
    example: [
      {
        id: 1,
        title: '나의 첫 번째 게시글',
        content: '이것은 첫 번째 게시글의 내용입니다.',
      },
      {
        id: 2,
        title: '나의 두 번째 게시글',
        content: '이것은 두 번째 게시글의 내용입니다.',
      },
    ],
  })
  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @ApiOperation({
    summary: 'ID로 게시글 조회',
    description: 'ID로 단일 게시글을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '지정한 ID의 게시글',
    example: {
      id: 1,
      title: '나의 첫 번째 게시글',
      content: '이것은 첫 번째 게시글의 내용입니다.',
    },
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(+id);
  }

  @ApiOperation({
    summary: 'ID로 게시글 수정',
    description: '지정한 ID의 게시글을 수정합니다.',
  })
  @ApiBody({
    type: CreatePostDto,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(+id, updatePostDto);
  }

  @ApiOperation({
    summary: 'ID로 게시글 삭제',
    description: '지정한 ID의 게시글을 삭제합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '지정한 ID의 게시글이 삭제되었습니다.',
    example: {
      message: '게시글이 성공적으로 삭제되었습니다.',
    },
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      message: await this.postService.remove(+id),
    };
  }
}
