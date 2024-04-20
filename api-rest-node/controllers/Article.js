const validator = require("validator");
const Article = require("../models/Article")

const test = (req, res) => {
    return res.status(200).json({
        msg: "Soy un test en el ArticleController"
    });
}

//Almacena un articulo
const create = async (req, res) => {
    try {
        // Recoger los parámetros por post a guardar
        const params = req.body;

        // Validar datos
        const validator_title = !validator.isEmpty(params.title) &&
            validator.isLength(params.title, { min: 5, max: 15 });
        const validator_content = !validator.isEmpty(params.content);

        if (!validator_title || !validator_content) {
            throw new Error("No se ha validado la información");
        }

        // Crear el objeto a guardar
        const article = new Article(params);

        // Guardar el artículo en la base de datos
        await article.save();

        return res.status(200).json({
            status: "success",
            msg: "Artículo almacenado correctamente",
            article: article // Aquí puedes enviar el artículo guardado en la respuesta si lo necesitas
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            msg: "Error al guardar",
            error: error.message // Puedes enviar el mensaje de error en la respuesta si lo necesitas
        });
    }
}



//Muestra todos los arituclos

const getArticles = async (req, res) => {
    try {
        let query = Article.find({});
        
        if (req.params.last) {
            query.limit(2);
        }

        const articles = await query.sort({ date: -1 }).exec();

        if (!articles || articles.length === 0) {
            return res.status(404).json({
                status: "error",
                msg: "No se encontraron artículos",
            });
        }

        return res.status(200).json({
            status: "success",
            msg: "Artículos obtenidos correctamente",
            articles: articles
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            msg: "Error al obtener los artículos",
            error: error.message
        });
    }
}


const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                status: "error",
                msg: "No se encontró el artículo",
            });
        }

        return res.status(200).json({
            status: "success",
            msg: "Artículo obtenido correctamente",
            article: article
        });
    } catch (error) {
        return res.status(404).json({
            status: "error",
            msg: "No se encontró el artículo",
        });
    }
}

const deleteArticleById = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);

        if (!article) {
            return res.status(404).json({
                status: "error",
                msg: "No se encontró el artículo para eliminar",
            });
        }

        return res.status(200).json({
            status: "success",
            msg: "Artículo eliminado correctamente",
            deletedArticle: article
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            msg: "Error al eliminar el artículo",
            error: error.message
        });
    }
}





module.exports = {
    test,
    create,
    getArticles,
    getArticleById,
    deleteArticleById
}