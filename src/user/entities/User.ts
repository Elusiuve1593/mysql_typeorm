import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  authStrategy: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
