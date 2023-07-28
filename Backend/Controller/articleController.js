const Article = require("../Models/article")
const { isAuthenticated } = require("../Middleware/auth")



/*------------------------------- Create Artciles ----------------------------*/

exports.createArticle = isAuthenticated, async (req, res) => {
  try {
    const { title, content, is_premium } = req.body

    const article = await Article.create({ title, content, is_premium })
    
    return res.status(201).json({ success: true, article })

  }
  catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
}






/* ---------------------- Get Article By Id --------------------------------------*/


exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    //checking article is premium or not
    if (article.is_premium) {
          if (req.user && req.user.is_premium_user) {
            return res.status(200).json(article); //if user has premium
         }
          //if user not an premium user
      return res.status(403).json({ message: "This is premium article you cant access" })

    }

    return res.status(200).json(article); //for non-logged user

  }
  catch (err) {
    res.status(500).send({ success: false, message: err.message });

  }
};





/*------------------------------- getting Non Premium Articles----------------------------*/


exports.getAllArticles = async (req, res) => {
  try {
    // Find all articles (excluding premium ones)
    const articles = await Article.find({ is_premium: false });

    // If the user is logged in as a premium user, fetch all articles

    if (req.user && req.user.is_premium_user) {
      const premiumArticles = await Article.find({ is_premium: true });
      articles.push(...premiumArticles);
    }

    return res.status(200).json(articles); //for non-logged user

  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
}













