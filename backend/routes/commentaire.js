const express = require('express');
const router = express.Router();
const CommentaireCtrl = require('../controllers/commentaire');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');






//           ********* Comments **********

//Post un commentaire
router.post('/article/:articleId/comment', auth, multer, CommentaireCtrl.createComment);

// Recuperer tous les commentaires
router.get('/article/:articleId/comment', auth, CommentaireCtrl.getAllCommentaires);

// Supprimer un commentaire
router.delete('/comment/:id', auth, CommentaireCtrl.deleteComment);



module.exports = router;