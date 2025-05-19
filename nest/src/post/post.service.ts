import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class PostService {
  constructor(private readonly dataSource: DataSource) {}
  async create(createPostDto: CreatePostDto) {
    const post = this.dataSource.getRepository('Post').create(createPostDto);
    return await this.dataSource.getRepository('Post').save(post);
  }

  async findAll() {
    const posts = await this.dataSource.getRepository('Post').find();
    return posts.map((post) => {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
      };
    });
  }

  async findOne(id: number) {
    const post = await this.dataSource.getRepository('Post').findOneBy({ id });
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.dataSource.getRepository('Post').findOneBy({ id });
    if (!post) {
      throw new Error('Post not found');
    }
    await this.dataSource.getRepository('Post').update(id, updatePostDto);
    const updatedPost = await this.dataSource
      .getRepository('Post')
      .findOneBy({ id });
    if (!updatedPost) {
      throw new Error('Post not found');
    }
    return updatedPost;
  }

  async remove(id: number) {
    const post = await this.dataSource.getRepository('Post').findOneBy({ id });
    if (!post) {
      throw new Error('Post not found');
    }
    await this.dataSource.getRepository('Post').delete(id);
    return 'Post deleted successfully';
  }
}
