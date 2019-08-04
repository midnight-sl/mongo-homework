const {Article, User} = require('../models');

function createArticle(req, res) {
  const payload = req.body;
  if (!payload.owner){
    return res.send(`${error} the User Id is incorrect`);
  } else {
    User.findById(payload.value.id, (error) => {
      if (error) {
        return res.send('There is no user with this Id. Try another one');
      }
      Article.create(payload, (error, article) => {
        if (error) {
          res.send(error)
        }
        User.findByIdAndUpdate(payload.value.id, {$inc: {numberOfArticles: 1}}, (error) => {
          if (error) {
            return res.send(`User doesn't exist, no way to update it`)
          }
          res.send(article);
        });
      });
    });
  }
};

function editArticle(req, res){
  const id = req.params;
  const payload = req.body;

  Article.findById({_id: id.value.id }, (error, article) => {
    if (error) {
      return res.send(`there is no article with such id. Try another one`);
    }
    User.findById({_id: article.owner}, (error) => {
      if (error) {
        return res.send('there is no user with such id. Try another one');
      }
      Article.findByIdAndUpdate({_id: id.value.id}, payload, (error) => {
        if (error) {
          return res.send(`No way to update the article, as it doesn't exist`);
        }
        res.send(`Article has been successfully updated!`)
      });
    });
  });
}

function getArticles(req, res) {
  const query = req.query;
  Article.find(query || {}).populate('owner').exec( (error, allArticles) => {
    if(error) {
      res.send(error);
    } else {
      if(allArticles.length === 0){
        res.send('There are no articles yet, create new one to start')
      } else {
        res.send(allArticles);
      }
    }
  })
}

function deleteArticle(req, res){
  const payload = req.body;
  const id = req.params;

  Article.findById({_id: id.value.id}, (error, article) => {
    if (error) {
      return res.send(`there is no article with such id. Try another one`);
    }
    User.findById({_id: article.owner}, (error) => {
      if (error) {
        return res.send('there is no user with such id. Try another one');
      }
      Article.findByIdAndRemove({_id: article._id}, (error, article) => {
        if (error) {
          return res.send(`No way to delete this article, as it doesn't exist`);
        }
        User.findByIdAndUpdate({_id: article.owner}, {$inc: {numberOfArticles: -1}}, (error) => {
          if (error) {
            return res.send(`Can't update as this user doesn't exist`);
          }
          res.send(`Article successfully deleted`);
        });
      });
    });
  });
}

module.exports = {createArticle, editArticle, getArticles, deleteArticle};