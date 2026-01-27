/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;
  @Field()
  email: string;
  @Field()
  name: string;
  @Field({ nullable: true })
  bio?: string;
  @Field({ nullable: true })
  avatar?: string;
  @Field(() => [Post])
  posts?:Post[];
  @Field(() => [Comment])
  comments:Comment[];

}
