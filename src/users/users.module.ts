import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [PrismaModule, PostsModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
