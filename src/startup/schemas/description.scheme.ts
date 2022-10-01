import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CommentModel } from './models/comment.model';

export type StartupDescriptionDocument = StartupDescription & Document;

@Schema()
export class StartupDescription {

  @Prop()
  startupId: string;
  
  @Prop()
  userId: string;

  @Prop()
  text: string;
}

export const StartupDescriptionScheme = SchemaFactory.createForClass(StartupDescription);
