import { Comment as SendingComment } from "../model"
import { MongoDbDto } from "./MongoDbDto"

export interface Comment extends MongoDbDto, SendingComment {
  userId: string
}

export type Comments = Comment[]
