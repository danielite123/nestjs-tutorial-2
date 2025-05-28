import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() createPostDto: CreatePostDto) {
    const { title, description, userId } = createPostDto;

    const data = {
      title,
      description,
      user: {
        connect: { id: userId },
      },
    };

    return this.postService.createPost(data);
  }
}
