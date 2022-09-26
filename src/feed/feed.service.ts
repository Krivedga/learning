import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feed, FeedDocument } from 'src/schemas/feed.scheme';
import { Like, LikeDocument } from 'src/schemas/like.scheme';

@Injectable()
export class FeedService {

    constructor(@InjectModel(Feed.name) private feedModel: Model<FeedDocument>, @InjectModel(Like.name) private likeModel: Model<LikeDocument>) {}

    async create(createFeedDto): Promise<Feed> {
        const createdFeed = new this.feedModel(createFeedDto);
        return createdFeed.save();
      }
    
      async findAll(page: number): Promise<Feed[]> {

        const maxFeedInOne = 20

        const feeds = await this.feedModel.find().exec();
        const size = feeds.length
        const allPages = Math.floor(size / maxFeedInOne);
        if(page > allPages) page = allPages


        const limitedFeeds = []
        for (let i = page * maxFeedInOne; i < (page + 1) * maxFeedInOne; i++) {
          if(i >= size) break;

          limitedFeeds.push(feeds[i])
        }

        return limitedFeeds;
      }
      
      async find(id: string): Promise<Feed> {    

        this.feedModel.countDocuments({_id: id}, (err, count) => {
          if(count) {
            console.log(1);
            
            return this.feedModel.findById(id); 
          }else console.log(2);
          
          
      });

      //return this.feedModel.findById(id);
      console.log("n");
      return null
      
        

      }

      async setDescription(id: string) {
        this.feedModel.findById(id)
      }

      async setLike(id: string,value: boolean) {

        

      }

}
