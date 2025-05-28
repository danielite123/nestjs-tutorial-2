import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  createPost(data: Prisma.PostCreateInput) {
    return this.prisma.post.create({ data });
  }
}
