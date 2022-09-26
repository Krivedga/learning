import { Controller, Param, Post } from '@nestjs/common';

@Controller('feed')
export class FeedController {

    @Post('create')
    async create(){

    }

    @Post('get/:id')
    async getById(@Param() id: number){

    }

    @Post('get')
    async getAll(){

    }

}
