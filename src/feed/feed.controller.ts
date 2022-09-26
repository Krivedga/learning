import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { FeedModel } from './feed.model';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {

    constructor(private readonly feedService: FeedService){

    }

    @Post('create')
    async create(@Body() dto: Omit<FeedModel,'id'>){

        this.feedService.create(dto);

        return `create ${dto.text}`;
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
    async like(@Param('value') value: boolean, @Param('feedID') feedID: string){
        this.feedService.setLike(feedID, value);
    }

}
