import { MongoDbDto } from "./MongoDbDto"
import { Rating as ModelRating } from "../model/rating"

export interface Rating extends MongoDbDto, ModelRating {
  userId: string
}
