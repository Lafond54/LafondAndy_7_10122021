const { Message } = require('../database');
const fs = require('fs');
const { json } = require('express');
const { Article, User, Comment } = require('../database');
const jwt = require('jsonwebtoken');


// Article **************************************************
//Post
// Créer un Post
exports.createPost = (req, res) => {
    const text = req.body.text;
    //recupéré userId
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log(decodedToken)
    if (text == '') {
        return res.status(400).json({ error: 'Texte manquant' });
    }
    User.findOne({ where: { id: userId } })
        .then(userFound => {
            if (userFound) {
                Article.create({
                    text: req.body.text,
                    userId: userFound.id
                })

                    .then(() => res.status(201).json({ message: 'Message créé !' },))
                    .catch(error => {
                        console.log(error)
                        res.status(400).json({ error: 'Création du message échoué' })
                    });
            } else {
                console.log(error)
                return res.status(404).json({ error: 'Utilisateur non trouvé' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Recherche de l\'utilisateur échouée' })
        });
};









exports.arrayIDs = (req, res) => {
    Article.findAll()

        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(400).json({ error }));
}


exports.oneID = (req, res) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauceNormalizer(sauce, req)))
        .catch(error => res.status(404).json({ error }));
}

exports.addSauce = (req, res) => {
    const arraySauce = JSON.parse(req.body.sauce)


    const sauce = new Sauces({
        ...arraySauce,
        fileName: req.file.filename,
        usersLiked: [],
        usersDisliked: []
    });

    sauce.save()
        .then(() => res.status(201).json({ message: "Sauce ajouté avec son image !" }))
        .catch(error => res.status(400).json({ error }));
}


exports.modifPost = (req, res) => {

  
}


exports.deletePost = (req, res) => {
    Article.findOne({      
        where: { id: req.params.articleId }
    })

        .then(article => {
            if (req.body.userId == article.userId) {
                article.destroy({
                    where: { id: req.params.articleId }
                })
                    .then(() => res.status(200).json({ message: 'Message supprimé' }))
                    .catch(() => res.status(500).json({ error: 'Suppression du message échoué' }));


            }
            else {
                res.status(403).json({ error: 'Vous n\'avez pas le droit de supprimer ce message' });
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Suppression du message échoué' })
        });

};






//Commentaire ******************************************


// Créer un commentaire
exports.createComment = (req, res) => {
    const text = req.body.text;
    //recupéré userId
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log(decodedToken)
    if (text == '') {
        return res.status(400).json({ error: 'Commentaire manquant' });
    }

    Comment.create({
        text: req.body.text,
        userId: userId,
        articleId: req.params.articleId,
    })

        .then(() => res.status(201).json({ message: 'Commentaire créé !' },))
        .catch(error => {
            console.log(error)
            res.status(400).json({ error: 'Création du commentaire échoué' })
        });

}