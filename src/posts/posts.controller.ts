import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dtos/UpdatePost.dto';

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

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(id);
  }

  @Delete(':postId/user/:userId')
  deletePostById(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.postService.deletePostsById(postId, userId);
  }

  @Patch(':postId/user/:userId')
  updatePostById(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePostById(postId, userId, updatePostDto);
  }
}
