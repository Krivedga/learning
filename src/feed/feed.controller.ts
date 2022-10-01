import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Patch,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { Role } from 'src/enums/roles.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { RemoveDescriptionModel } from 'src/schemas/models/description-delete.model';
import { DescriptionUpdateModel } from 'src/schemas/models/description-update.model';
import { DescriptionModel } from 'src/schemas/models/description.model';
import { LikeModel } from 'src/schemas/models/like.model';
import { FeedModel } from './feed.model';
import { FeedService } from './feed.service';

@Controller('feed')
@UseGuards(RolesGuard)
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post('create')
  async create(@Body() dto: Omit<FeedModel, 'id'>) {
    const createdFeed = this.feedService.create(dto);

    return createdFeed;
  }

  @Get('get/:id')
  @Roles(Role.admin)
  async getById(@Param('id') id: string) {
    return this.feedService.find(id);
  }

  @Get('getAll/:page')
  async getAll(@Param('page') page: number) {
    return this.feedService.findAll(page);
  }

  @Get('like')
  async like(@Body() dto: LikeModel) {
    return this.feedService.setLike(dto);
  }

  @Post('description')
  async description(@Body() dto: DescriptionModel) {
    return this.feedService.setDescription(dto);
  }
  @Patch('description')
  async descriptionUpdate(@Body() dto: DescriptionUpdateModel) {
    return this.feedService.updateDescription(dto);
  }
  @Delete('description')
  async descriptionDelete(@Body() dto: RemoveDescriptionModel) {
    return this.feedService.removeDescription(dto);
  }
}
