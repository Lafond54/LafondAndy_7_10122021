const express = require('express');
const router = express.Router();
const ArticleCtrl = require('../controllers/article');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');



//********************** ROUTES ********************************* *

//           ********** Articles **********

// Renvoie un tableau de toutes les articles de la base de données.
router.get('/article', auth, ArticleCtrl.arrayIDs);
// Renvoie l'article avec l’_id fourni.
router.get('/article/:id', auth, ArticleCtrl.oneID);


//Post un article
router.post('/article', auth, multer, ArticleCtrl.createPost);


// Supprimer article
router.delete('/article/:id', auth, multer, ArticleCtrl.deletePost);


module.exports = router;