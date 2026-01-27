/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;
  @Field()
  title: string;
  @Field()
  content: string;
  @Field(() => Boolean)
  published: boolean;
  @Field({ nullable: true })
  slug?: string;
  @Field({ nullable: true })
  thumbnail?: string;
  @Field() 
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
