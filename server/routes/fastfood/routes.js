const Article = require('../../models/fastfood/article');
const Category = require('../../models/fastfood/category');
const Order = require('../../models/fastfood/order');
const Comment = require('../../models/fastfood/comment');
const Rate = require("../../models/fastfood/rate")
const User = require('../../models/user');
const verifyToken = require('../session/verifyToken');

module.exports = function(app){
    app.get('/fastfood/articles', async function (req,res){
        try{
            let articles = await Article.find();
            res.status(200).send(articles);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
    });

    app.get('/fastfood/articles/:categoryId', async function (req,res){
        try{
            let articles = await Article.find({categoryId:req.params.categoryId});
            res.status(200).send(articles);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.get('/fastfood/article/:articleId', async function (req,res){
        try{
            let article = await Article.findById(req.params.articleId);
            res.status(200).send(article);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.get('/fastfood/categories/', async function (req,res){
        try{
            let categories = await Category.find();
            res.status(200).send(categories);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

    app.get('/fastfood/ingredients/', async function (req,res){
        try{
            let ingredients = []
            let articles = await Article.find();
            for (let i = 0; i < articles.length; i++) {
                ingredients = ingredients.concat(articles[i].ingredients[0].split(","))
            }
            ingredients = [...new Set(ingredients)]
            res.status(200).send(ingredients);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);
        }
    });


     app.get('/fastfood/ratings/:articleId',async function (req,res){
        try{
            let comments = await Comment.find({articleId: req.params.articleId});
            let ratings = await Rate.find({articleId: req.params.articleId})
            const result = {}
            for (let i = 0; i < comments.length; i++) {
                const userId = comments[i].userId
                const user = await User.findOne({_id: userId})
                result[userId] = {
                    comments: result[userId]?.comments?.concat(comments[i]) ?? [comments[i]],
                    userName: `${user.firstname} ${user.lastname}`
                }
            }
            for (let i = 0; i < ratings.length; i++) {
                const userId = ratings[i].userId
                const user = await User.findOne({_id: userId})
                result[userId] = {
                    ...result[userId],
                    rating: ratings[i],
                    userName: `${user.firstname} ${user.lastname}`
                }
            }
            res.status(200).send(result);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     app.get('/fastfood/user-article-information/:articleId',verifyToken,  async function (req,res){
         try{
             const didUserBuyArticleConst = await didUserBuyArticle(req.user.id, req.params.articleId)
             const didUserRateArticleConst = didUserBuyArticleConst ? await didUserRateArticle(req.user.id, req.params.articleId) : false
             const result = {
                 didUserBuyArticle: didUserBuyArticleConst,
                 didUserRateArticle: didUserRateArticleConst
             }
             res.status(200).send(result)
         }catch(error){
             let errorObj = {body:req.body,errorMessage:"Server error!" };
             res.status(500).send(errorObj);
         }
     });

     app.get('/fastfood/orders/',verifyToken, async function (req,res){
        try{
            let orders = await Order.find({userId:req.user.id});
            res.status(200).send(orders);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     app.post('/fastfood/order/', verifyToken,async function (req,res){
        try{
            let orderCount = await Order.count({userId:req.user.id})
            let date = new Date();
            let orderData = {
                orderNr: orderCount+1,
                userId: req.user.id,
                articles: req.body,
                orderDate:date.getDate() + "." + (date.getMonth()+1) + "."+date.getFullYear()
            };
            console.log(orderData);
            let order = new Order(orderData);
            order.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Order was successful!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.post('/fastfood/comment/', verifyToken,async function (req,res){
        try{
            let boughtArticle = didUserBuyArticle(req.user.id, req.body.articleId )
            if(boughtArticle){
                let commentData = req.body;
                let comment = new Comment({...commentData, userId: req.user.id});
                comment.save(function (err){
                    if(err){
                        res.status(422).send("Data are not correct!");
                    }else{
                        res.status(201).send("Comment was successful!");
                    }
                });
            }else{
                res.status(422).send("Article was not bought!");
            }
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.post('/fastfood/rate/', verifyToken,async function (req,res){
        try{
            let boughtArticle = didUserBuyArticle(req.user.id, req.body.articleId )
            if(boughtArticle){

                let ratings = await Rate.find({articleId: req.body.articleId});

                let newRating =0;
                const rated = await didUserRateArticle(req.user.id, req.body.articleId)
                if(!rated){

                    newRating = newRating + req.body.rate;
                    newRating = newRating / (ratings.length+1);
                    const article = Article.findById(req.body.articleId)
                    const ratingCount = (article.numberOfRatings ?? 0)+1
                    await Article.findByIdAndUpdate({_id:req.body.articleId},{"rating":newRating, "numberOfRatings": ratingCount});

                    let rateData = {
                        ...req.body,
                        userId: req.user.id
                    };
                    let rate = new Rate(rateData);
                    rate.save(function (err){
                        if(err){
                            res.status(422).send("Data are not correct!");
                        }else{
                            res.status(201).send("Rating was successful!");
                        }
                    });
                }else{
                    res.status(422).send("Article was already rated!");
                }
            }else{
                res.status(422).send("Article was not bought, can not be rated!");
            }

        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });



     app.post('/fastfood/category', verifyToken,function(req,res){
        try{
            let categoryData = req.body;

            let category = new Category(categoryData);
            category.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Category was successfully added!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.post('/fastfood/article', verifyToken,function(req,res){
        try{
            let articleData = req.body;

            let article = new Article(articleData);
            article.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Article was successfully added!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });
}

async function didUserBuyArticle(userId, articleId) {
    let orders = await Order.find({userId: userId}).sort({orderNr:'desc'});
    for(let i=0; i < orders.length; i++){
        for(let j =0; j < orders[i].articles.length;j++){
            if(articleId == orders[i].articles[j].articleId){
                return true
            }
        }
    }
    return false
}

async function didUserRateArticle(userId, articleId) {
    let ratings = await Rate.find({articleId: articleId});

    let newRating =0;
    for(let i=0; i < ratings.length;i++){

        if(ratings[i].userId == userId){
            return true;
        }
        newRating =  newRating + rating[i];
    }
    return false
}