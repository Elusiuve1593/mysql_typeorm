import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { User } from './entities/User';
import { CreatePostDto } from './dto/create_post.dto';
import { Post } from './entities/Post';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  createUser(createUser: CreateUserDto): Promise<User> {
    const user = new User(createUser);
    return this.userRepository.save(user);
  }

  async createPost(id: number, createPost: CreatePostDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const post = new Post({ ...createPost, user });
    return this.postRepository.save(post);
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['posts'] });
  }

  updateUser(id: number, updateUser: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update({ id }, { ...updateUser });
  }

  deleteUser(id: number) {
    this.userRepository.delete({ id });
  }
}
