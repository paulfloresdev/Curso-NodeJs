const express = require("express");
const router = express.Router();

const ArticleController = require("../controllers/Article");

// Rutas de prueba
router.get("/test", ArticleController.test);
router.post("/create", ArticleController.create);
router.get("/articles/:last?", ArticleController.getArticles);
router.get("/article/:id", ArticleController.getArticleById);
router.delete("/article/:id", ArticleController.deleteArticleById);


module.exports = router;