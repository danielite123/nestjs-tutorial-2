import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { updateUserSettingsDto } from './dtos/UpdateUserSetting.dto';
import { PostsService } from 'src/posts/posts.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private postService: PostsService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUserById(id);

    if (!user) throw new HttpException('User Not Found', 404);

    return user;
  }

  @Patch(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUserById(id);
  }

  @Patch(':id/settings')
  updateUserSettingsByUserId(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserSettingsDto: updateUserSettingsDto,
  ) {
    return this.usersService.updateUserSettings(id, updateUserSettingsDto);
  }

  @Get(':id/posts')
  getUserPostsById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getUserPostsById(id);
  }
}
