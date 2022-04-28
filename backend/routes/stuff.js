const express = require('express');
const router = express.Router();
const StuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');



//********************** ROUTES ********************************* *



// Renvoie un tableau de toutes les articles de la base de données.
router.get('/article', auth, StuffCtrl.arrayIDs);


// Renvoie l'article avec l’_id fourni.
router.get('/article/:id', auth, StuffCtrl.oneID);

// Renvoie les articles d'un seul auteur.
// router.get('/user/:id/articles', auth, multer, StuffCtrl.allPostsOneUser)

//Post un article

router.post('/article', auth, multer, StuffCtrl.createPost);


// //Modif article
// router.put('/article/:id', auth, multer, StuffCtrl.modifPost);


// Supprimer article
router.delete('/article/:id', auth, multer, StuffCtrl.deletePost);




// Comments


//Post un commentaire

router.post('/article/:articleId/comment', auth, multer, StuffCtrl.createComment);

router.get('/article/:articleId/comment', auth, StuffCtrl.getAllCommentaires);

// router.get('/comment', auth, StuffCtrl.getAllCommentaires)

router.delete('/comment/:id', auth, StuffCtrl.deleteComment);


module.exports = router;