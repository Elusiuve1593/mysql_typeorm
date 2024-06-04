import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/user/entities/Post';
import { User } from 'src/user/entities/User';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        port: configService.getOrThrow('MYSQL_PORT'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        username: configService.getOrThrow('MYSQL_USERNAME'),
        synchronize: configService.getOrThrow('MYSQL_SYNC'),
        autoLoadEntities: true,
        entities: [User, Post],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
