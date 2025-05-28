import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  createPost(data: Prisma.PostCreateInput) {
    return this.prisma.post.create({ data });
  }

  getAllPosts() {
    return this.prisma.post.findMany();
  }

  getPostById(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async getUserPostsById(userId: number) {
    const post = await this.prisma.post.findMany({ where: { userId } });

    if (!post) throw new HttpException('No Post Published', 404);

    return post;
  }

  async deletePostsById(postId: number, userId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw new HttpException('Post does not exist', 404);

    if (post.userId != userId)
      throw new HttpException('You are not authorized to delete post', 403);

    return this.prisma.post.delete({
      where: { id: postId },
    });
  }

  async updatePostById(
    postId: number,
    userId: number,
    data: Prisma.PostUpdateInput,
  ) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) throw new HttpException('Post does not exist', 404);

    if (post.userId != userId)
      throw new HttpException('You are not authorized to delete post', 403);

    return this.prisma.post.update({ where: { id: postId }, data });
  }
}
