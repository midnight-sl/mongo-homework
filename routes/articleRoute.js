const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/article');

router.post('/', articlesController.createArticle);
router.put('/:articleId', articlesController.editArticle);
router.get('/', articlesController.getArticles);
router.delete('/:articleId', articlesController.deleteArticle);


module.exports = router;