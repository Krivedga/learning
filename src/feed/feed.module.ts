import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feed, FeedScheme } from 'src/schemas/feed.scheme';
import { Like, LikeScheme } from 'src/schemas/like.scheme';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeScheme }]),
    MongooseModule.forFeature([{ name: Feed.name, schema: FeedScheme }]),
],
  controllers: [FeedController],
  providers: [FeedService]
})
export class FeedModule {

  

}
