/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class PostService {
  constructor(private  prismaService: PrismaService) {}
  
  
  async findAll() {
    
    return await this.prismaService.post.findMany();
  }

  
}
