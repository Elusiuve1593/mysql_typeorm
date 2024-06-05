import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('TYPEORM_HOST'),
        port: configService.getOrThrow('TYPEORM_PORT'),
        database: configService.getOrThrow('TYPEORM_DATABASE'),
        username: configService.getOrThrow('TYPEORM_USERNAME'),
        synchronize: configService.getOrThrow('TYPEORM_SYNC'),
        autoLoadEntities: configService.getOrThrow('TYPEORM_AUTO')
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
