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

                        .then(() => res.status(201).json({ message: 'Message créé !' },))
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

                        .then(() => res.status(201).json({ message: 'Message créé !' },))
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




// const fs = require('fs');
// exports.modifSauce = (req, res) => {

//     if (req.file) {  // Si il y a une  nouvelle image il faut supprimer la précedente avant de modifier la sauce

//         Sauces.findOne({ _id: req.params.id })
//             .then(sauce => {
//                 const filename = sauce.fileName;
//                 fs.unlink(`images/${filename}`, () => {

//                     const sauceObject = {
//                         ...JSON.parse(req.body.sauce), fileName: req.file.filename        
//                     }

//                     Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//                         .then(() => res.status(200).json({ message: 'Sauce modifié!' }))
//                         .catch(error => res.status(500).json({ error }));
//                 })
//             })
//             .catch(error => res.status(500).json({ error }));
//     } else {   // Si on modifie pas l'image, on met à jour la sauce sans toucher aux images
//         const sauceObject = { ...req.body };
//         Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//             .then(() => res.status(200).json({ message: 'Sauce modifié!' }))
//             .catch(error => res.status(500).json({ error }))
//     };
// }


// exports.deleteSauce = (req, res) => {
//     Sauces.findOne({ _id: req.params.id })
//         .then(sauce => {
//             const filename = sauce.fileName;
//             fs.unlink(`images/${filename}`, () => {

//                 Sauces.deleteOne({ _id: req.params.id })
//                     .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
//                     .catch(error => res.status(500).json({ error }));
//             });
//         })
//         .catch(error => res.status(500).json({ error }));
// };






exports.arrayIDs = (req, res) => {
    Article.findAll()

        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(400).json({ error }));
}


exports.oneID = (req, res) => {
    Article.findOne({ id: req.params.id })
        .then(article => res.status(200).json(article))
        .catch(error => res.status(404).json({ error }));
}

// Articles appartenant à un seul auteur.
exports.allPostsOneUser = (req, res) => {
    // const token = req.headers.authorization.split(' ')[1];
    // const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // const userId = decodedToken.userId;

    Article.findall({ userId: req.params.id })
        .then(article => res.status(200).json(article))
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
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    // exports.deleteSauce = (req, res) => {
    //     Sauces.findOne({ _id: req.params.id })
    //         .then(sauce => {
    //             const filename = sauce.fileName;
    //             fs.unlink(`images/${filename}`, () => {

    //                 Sauces.deleteOne({ _id: req.params.id })
    //                     .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    //                     .catch(error => res.status(500).json({ error }));
    //             });
    //         })
    //         .catch(error => res.status(500).json({ error }));
    // };



    User.findOne({ where: { id: userId } })
        .then(userFound => {
            if (userFound) {
                Article.findOne({
                    where: { id: req.params.id }
                })

                    .then(articleFound => {
                        if (userFound.id == articleFound.userId) {

                            if (articleFound.imgArticle != null) {
                                const filename = articleFound.imgArticle;

                                fs.unlink(`${filename}`, () => {
                                    articleFound.destroy({
                                        where: { id: req.params.articleId }
                                    })
                                        .then(() => res.status(200).json({ message: 'Message supprimé' }))
                                        .catch(() => res.status(500).json({ error: 'Suppression du message échoué' }));
                                })
                            }

                            else {
                                articleFound.destroy({
                                    where: { id: req.params.articleId }
                                })
                                    .then(() => res.status(200).json({ message: 'Message supprimé' }))
                                    .catch(() => res.status(500).json({ error: 'Suppression du message échoué' }));
                            }
                        }
                        else {
                            res.status(403).json({ error: 'Vous n\'avez pas le droit de supprimer ce message' });
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(500).json({ error: 'Suppression du message échoué' })
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






//Commentaire ******************************************


// Créer un commentaire
exports.createComment = (req, res) => {
    const text = req.body.text;
    //recupéré userId
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log(decodedToken)
    if (text == '' && req.file == null) {
        return res.status(400).json({ error: 'Commentaire et image manquant' });
    }
    if (req.file) {
        Comment.create({
            text: req.body.text,
            userId: userId,
            ArticleId: req.params.articleId,
            imgComment: `images/${req.file.filename}`
        })

            .then(() => res.status(201).json({ message: 'Commentaire créé !' },))
            .catch(error => {
                console.log(error)
                res.status(400).json({ error: 'Création du commentaire échoué' })
            });
    }
    else {
        Comment.create({
            text: req.body.text,
            userId: userId,
            ArticleId: req.params.articleId,
            imgComment: null,
        })

            .then(() => res.status(201).json({ message: 'Commentaire créé !' },))
            .catch(error => {
                console.log(error)
                res.status(400).json({ error: 'Création du commentaire échoué' })
            });
    }


}

//GET
// Voir les commentaires
exports.getAllCommentaires = (req, res) => {
    Comment.findAll({
        where: { ArticleId: req.params.articleId },
    })
        .then(commentaireFound => {
            if (commentaireFound) {
                res.status(200).json(commentaireFound);
                console.log(commentaireFound);
            } else {
                res.status(404).json({ error: 'Aucun commentaire publié' });
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({ error: 'Recherche du commentaire échoué' });
        });
}

//DELETE
// Supprimer un commentaire
exports.deleteComment = (req, res) => {
    console.log('delete commentaire')
    Comment.findOne({
        where: { id: req.params.id }
    })
        .then(commentaireFound => {
            if (commentaireFound) {

                if (commentaireFound.imgComment != null) {
                    const filename = commentaireFound.imgComment;

                    fs.unlink(`${filename}`, () => {
                        commentaireFound.destroy()
                            .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
                            .catch(error => {
                                console.log(error)
                                res.status(500).json({ error: 'Suppression du commentaire échoué' })
                            });
                    })
                }

                else {

                    commentaireFound.destroy()
                        .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
                        .catch(error => {
                            console.log(error)
                            res.status(500).json({ error: 'Suppression du commentaire échoué' })
                        });
                }

            } else {
                return res.status(404).json({ error: 'Aucun commentaire supprimé' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Suppression du commentaire échoué' })
        });
}