import { Category as SendingCategory } from "../model"
import { MongoDbDto } from "./MongoDbDto"

export interface Category extends MongoDbDto, SendingCategory {}
