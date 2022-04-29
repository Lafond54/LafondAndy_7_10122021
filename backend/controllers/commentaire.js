const { Message } = require('../database');
const fs = require('fs');
const { json } = require('express');
const { User, Comment } = require('../database');
const jwt = require('jsonwebtoken');
const { request } = require('http');



//Commentaire ******************************************
//Pour les images Commentaire
function normalizerImgComment(comment, req) {
    return { ...comment.toJSON(), imgUrl: `${req.protocol}://${req.get("host")}/${comment.imgComment}` }

}

// Créer un commentaire
exports.createComment = (req, res) => {
    const text = req.body.text;
    //recupéré userId
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RTOKEN);
    const userId = decodedToken.userId;
    console.log(decodedToken)
    if (text == '' && req.file == null) {
        return res.status(400).json({ error: 'Commentaire et image manquant' });
    }

    Comment.create({
        text: req.body.text,
        userId: userId,
        ArticleId: req.params.articleId,
        imgComment: req.file ? `images/${req.file.filename}` : null
    })

        .then((comment) => res.status(201).json(normalizerImgComment(comment, req)))
        .catch(error => {
            console.log(error)
            res.status(400).json({ error: 'Création du commentaire échoué' })
        });



}

//GET
// Voir les commentaires
exports.getAllCommentaires = (req, res) => {
    Comment.findAll({
        where: { ArticleId: req.params.articleId },
    })

        //todo  Mon normalizer fonctionne ???
        .then(comments => res.status(200).json(comments.map(comment => normalizerImgComment(comment, req))))
        .catch(error => res.status(400).json({ error }));
}



//DELETE
// Supprimer un commentaire
exports.deleteComment = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RTOKEN);
    const userId = decodedToken.userId;
    try {
        const userFound = await User.findOne({ where: { id: userId } })
        if (!userFound) return res.status(404).json({ error: 'Recherche de l\'utilisateur échouée' })


        const commentaireFound = await Comment.findOne({ where: { id: req.params.id } })
        if (!commentaireFound) return res.status(404).json({ error: 'Commentaire introuvable' })

        if (userFound.id !== commentaireFound.userId && !userFound.isadmin) {
            console.log(userFound, commentaireFound)
            return res.status(403).json({ error: 'Vous n\'avez pas le droit de supprimer ce message' })
        }

        await commentaireFound.destroy()
        return res.status(200).json({ message: 'Commentaire supprimé' })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Une erreur s\'est produite' })
    }
}