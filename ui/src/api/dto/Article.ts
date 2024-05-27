import { MongoDbDto } from "./MongoDbDto"
import { Article as SendingArticle } from "../model"

export interface Article extends MongoDbDto, SendingArticle {}
