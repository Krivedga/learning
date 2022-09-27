import { Model, Types } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feed, FeedDocument } from 'src/schemas/feed.scheme';
import { Like, LikeDocument } from 'src/schemas/like.scheme';
import { DescriptionModel } from 'src/schemas/models/description.model';
import { LikeModel } from 'src/schemas/models/like.model';
import { Description, DescriptionDocument } from 'src/schemas/description.scheme';
import { DescriptionUpdateModel } from 'src/schemas/models/description-update.model';
import { RemoveDescriptionModel } from 'src/schemas/models/description-delete.model';

@Injectable()
export class FeedService {
  constructor(
    @InjectModel(Feed.name) private feedModel: Model<FeedDocument>,
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    @InjectModel(Description.name) private descModel: Model<DescriptionDocument>,
  ) {}

  async create(createFeedDto): Promise<Feed> {
    try {
      const createdFeed = new this.feedModel(createFeedDto);
      const createdFeedSaved = await createdFeed.save();

      const _feedId = createdFeedSaved._id;
      const createdLike = new this.likeModel({ feedId: _feedId, amount: 0 });
      createdLike.save();

      return createdFeedSaved;
    } catch (error) {}
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

  async setDescription(descDto : DescriptionModel): Promise<Description>{

    try {
      const text = descDto.text;
      const userId = descDto.userId;
      const feedId = descDto.feedId;

      const feedItem = await this.feedModel.findById(feedId);

      const createdDesc = new this.descModel({ feedId: feedId, text: text,userId: userId });
      const savedDesc = createdDesc.save();

      return savedDesc
    } catch (error) {
      
    }
  }
  async updateDescription(descDto : DescriptionUpdateModel): Promise<Description>{

    try {
      const text = descDto.text;
      const id = descDto.descId;


      await this.descModel.findOneAndUpdate({_id : id},{text : text});
      const updatedDescription = await this.descModel.findOne({id : id});

      return updatedDescription
      
    } catch (error) {
      
    }
  }
  async removeDescription(dto: RemoveDescriptionModel){
    try {
      const id = dto.descId;
      await this.descModel.findOneAndRemove({_id : id});

    } catch (error) {
      
    }
  }

  async setLike(likeDto: LikeModel): Promise<Like> {
    try {
      const _feedId = likeDto.feedId;
      const userId = likeDto.userId;

      const item = await this.feedModel.findById(_feedId);

      //код не продолжится если не найдет предмет в базе, а перейдет в catch
      console.log(1);

      try {
        const likeItem = (await this.likeModel.find({ feedId: _feedId }))[0];
        const likes = likeItem.amount;
        let usersId = likeItem.usersId;
        console.log(usersId);

        if (usersId.includes(userId)) {
          console.log('contains => remove');

          usersId = usersId.filter((item) => item !== userId);
        } else {
          console.log('no contains => add');
          usersId.push(userId);
        }
        console.log(usersId);

        await this.likeModel
          .findOneAndUpdate({ feedId: _feedId }, { usersId: usersId })
          .exec();
        const updatedLike = await this.likeModel.findOne({ feedId: _feedId });
        console.log(updatedLike);

        return updatedLike;
      } catch (error) {}

      return null;
    } catch (error) {
      //throw new HttpException(error, 500);
      return null;
    }
  }
}
