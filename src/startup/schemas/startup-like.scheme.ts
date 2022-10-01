import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CommentModel } from './models/comment.model';

export type StartupLikeDocument = StartupLike & Document;

@Schema()
export class StartupLike {

  @Prop()
  startupId: string;
  
  @Prop()
  usersId: string[];

  @Prop()
  amount: number;
}

export const StartupLikeScheme = SchemaFactory.createForClass(StartupLike);
