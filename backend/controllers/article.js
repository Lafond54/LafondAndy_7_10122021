const { Message } = require('../database');
const fs = require('fs');
const { json } = require('express');
const { Article, User } = require('../database');
const jwt = require('jsonwebtoken');
const { request } = require('http');



// Article **************************************************
//Post
// Créer un Post
exports.createPost = (req, res) => {
    const text = req.body.text;
    //recupéré userId
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RTOKEN);
    const userId = decodedToken.userId;
    const file = req.file
    console.log(decodedToken)
    if (text == '' && file == null) {
        return res.status(400).json({ error: 'Texte et image manquant' });
    }

    User.findOne({ where: { id: userId } })
        .then(userFound => {
            if (req.file) {
                if (userFound) {
                    Article.create({
                        text: req.body.text,
                        userId: userFound.id,
                        imgArticle: `images/${req.file.filename}`
                    })

                        .then((article) => res.status(201).json(normalizer(article, req)))
                        .catch(error => {
                            console.log(error)
                            res.status(400).json({ error: 'Création du message échoué' })
                        });
                } else {
                    console.log(error)
                    return res.status(404).json({ error: 'Utilisateur non trouvé' })
                }
            } else {
                if (userFound) {
                    Article.create({
                        text: req.body.text,
                        userId: userFound.id,
                        imgArticle: null,
                    })

                        .then((article) => res.status(201).json(normalizer(article, req)))
                        .catch(error => {
                            console.log(error)
                            res.status(400).json({ error: 'Création du message échoué' })
                        });
                } else {
                    console.log(error)
                    return res.status(404).json({ error: 'Utilisateur non trouvé' })
                }
            }


        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Recherche de l\'utilisateur échouée' })
        });

};



exports.arrayIDs = (req, res) => {
    Article.findAll({ order: [["createdAt", 'DESC']] })

        .then(articles => res.status(200).json(articles.map(article => normalizer(article, req))))
        .catch(error => res.status(400).json({ error }));
}


exports.oneID = (req, res) => {
    Article.findOne({ id: req.params.id })
        .then(article => res.status(200).json(normalizer(article, req)))
        .catch(error => res.status(404).json({ error }));
}


// Pour les images Article
function normalizer(article, req) {
    return { ...article.toJSON(), imgUrl: `${req.protocol}://${req.get("host")}/${article.imgArticle}` }

}





exports.deletePost = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RTOKEN);
    const userId = decodedToken.userId;
    try {
        const userFound = await User.findOne({ where: { id: userId } })
        if (!userFound) return res.status(404).json({ error: 'Recherche de l\'utilisateur échouée' })

        const articleFound = await Article.findOne({ where: { id: req.params.id } })
        if (!articleFound) return res.status(404).json({ error: 'Article introuvable' })

        if (userFound.id !== articleFound.userId && !userFound.isadmin) {
            console.log(userFound, commentaireFound)
            return res.status(403).json({ error: 'Vous n\'avez pas le droit de supprimer ce message' })
        }

        await articleFound.destroy()
        return res.status(200).json({ message: 'Article supprimé' })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Une erreur s\'est produite' })
    }

};

