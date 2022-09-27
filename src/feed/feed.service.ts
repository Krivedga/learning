import { Model, Types } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feed, FeedDocument } from 'src/schemas/feed.scheme';
import { Like, LikeDocument } from 'src/schemas/like.scheme';

@Injectable()
export class FeedService {
  constructor(
    @InjectModel(Feed.name) private feedModel: Model<FeedDocument>,
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
  ) {}

  async create(createFeedDto): Promise<Feed> {
    try{
      const createdFeed = new this.feedModel(createFeedDto);
    const createdFeedSaved = await createdFeed.save();

    const _feedId = createdFeedSaved._id;
    const createdLike = new this.likeModel({feedId: _feedId, amount: 0});
    createdLike.save();
    
    return createdFeedSaved;
  }catch (error){

  }
  }

  async findAll(page: number): Promise<Feed[]> {
    const maxFeedInOne = 20;

    const feeds = await this.feedModel.find().exec();
    const size = feeds.length;
    const allPages = Math.floor(size / maxFeedInOne);
    if (page > allPages) page = allPages;

    const limitedFeeds = [];
    for (let i = page * maxFeedInOne; i < (page + 1) * maxFeedInOne; i++) {
      if (i >= size) break;

      limitedFeeds.push(feeds[i]);
    }

    return limitedFeeds;
  }

  async find(id: string): Promise<Feed> {
    try {
      const item = await this.feedModel.findById(id);
      return item;
    } catch (error) {
      console.log('aboba');

      throw new HttpException(error, 500);
    }
  }

  async setDescription(id: string) {
    this.feedModel.findById(id);
  }

  async setLike(likeDto): Promise<Like> {
    try {
      const _feedId = likeDto.feedId;
      const userId = likeDto.userId;

      const item = await this.feedModel.findById(_feedId)
      
      //код не продолжится если не найдет предмет в базе, а перейдет в catch
      console.log(1);
      
      try {
        const likeItem = (await this.likeModel.find({"feedId": _feedId}))[0];
        const likes = likeItem.amount;
        let usersId = likeItem.usersId
        console.log(usersId);

        if(usersId.includes(userId)){
          console.log("contains => remove");
          
          usersId = usersId.filter(item => item !== userId)
        }else {
          console.log("no contains => add");
          usersId.push(userId)
        }
        console.log(usersId);

        

        await this.likeModel.findOneAndUpdate({"feedId":_feedId},{"usersId":usersId}).exec();   
        const updatedLike = await this.likeModel.findOne({"feedId":_feedId})
        console.log(updatedLike);
        
        return updatedLike
      } catch (error) {
        
      }

      return null;
    } catch (error) {
      



      //throw new HttpException(error, 500);
      return null;
    }
  }
}
