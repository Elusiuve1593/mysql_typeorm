import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { UserService } from './user.service';
import { User } from './entities/User';
import { UpdateUserDto } from './dto/update_user.dto';
import { UpdateResult } from 'typeorm';
import { CreatePostDto } from './dto/create_post.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUser: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUser);
  }

  @Post(':id/posts')
  createPost(
    @Body() createPostDto: CreatePostDto,
    @Param('id', ParseIntPipe) id: number) {
    return this.userService.createPost(id, createPostDto);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Put(':id')
  updateUser(
    @Body() updateUser: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateResult> {
    return this.userService.updateUser(id, updateUser);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    this.userService.deleteUser(id);
  }
}
