export interface Article {
  name: string
  price: number
  categoryId: string
  vegetarian: boolean
  href: string
  quantity: number
  rating: number
  shortdescription: string
  description: string
  ingredients: string[]
  numberOfRatings?: number
}
