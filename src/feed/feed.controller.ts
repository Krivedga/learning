import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { LikeModel } from 'src/schemas/models/like.model';
import { FeedModel } from './feed.model';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {

    constructor(private readonly feedService: FeedService){

    }

    @Post('create')
    async create(@Body() dto: Omit<FeedModel,'id'>){

        
        const createdFeed = this.feedService.create(dto);
        
        return createdFeed
    }

    @Get('get/:id')
    async getById(@Param('id') id: string){

        return this.feedService.find(id);
    }

    @Get('getAll/:page')
    async getAll(@Param('page') page: number){
        
        return this.feedService.findAll(page);
    }

    @Get('like')
    async like(@Body() dto: LikeModel){
        return this.feedService.setLike(dto);
    }

}
