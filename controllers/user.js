const {Article, User} = require('../models');

function createUser(req, res, next) {
  const payload = req.body;

  User.create(payload, (error, user) => {
    if (error) {
      res.send(`Something went wrong look for more details here: ${error}`);
    }
    res.send(user);
  })
}

function editUser(req, res){
  const payload = req.body;

  User.findByIdAndUpdate({_id: req.params.value.id}, payload, (error) => {
    if (error) {
      return res.post(`No way to edit this user , as it doesn't exist`);
    }
    res.send(`User ${req.params.value.id} has been successfully updated`);
  });
}

function getUser(req, res){
  User.findById( req.params.value.id, (error, user) => {
    if (error) {
      return res.send(`There is no User with this id. Try another one!`)
    }
    res.send(user);
  });
}

function deleteUser(req, res){
  const id = req.params.value.id;
  User.findByIdAndRemove({_id: id}, (err) => {
    if (error) {
      res.send(`No way to delete this user, as it doesn't exist`);
    }
    res.send(`User ${id} has been successfully deleted`);
  });
}

function getUsersArticles(req, res) {
  const id = req.params.value.id;
  Article.find({owner: id}).populate('owner').exec((error, usersArticles) => {
    if (error) {
      res.send(error);
    } 
    if (usersArticles.length === 0) {
      res.send('This user has no articles yet, create new one to start');
    } else {
      res.send(usersArticles);
    }
  })
}

module.exports = {createUser, editUser, getUser, deleteUser, getUsersArticles};