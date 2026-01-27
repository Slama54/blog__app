/* eslint-disable prettier/prettier */
import { Resolver, Query } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';


@Resolver(() => Post)
export class PostResolver {
  constructor( private readonly postService: PostService) {}



  @Query(() => [Post], { name: 'posts' })
  async findAll() {
    return await this.postService.findAll();
  }


}
