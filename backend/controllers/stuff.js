const { Message } = require('../database');
const fs = require('fs');
const { json } = require('express');
const { Article, User, Comment } = require('../database');
const jwt = require('jsonwebtoken');



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














function sauceNormalizer(sauce, req) {
    return {
        ...sauce.toObject(),
        likes: sauce.usersLiked.length,
        dislikes: sauce.usersDisliked.length,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${sauce.fileName}`
    }


}


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


exports.modifSauce = (req, res) => {

    if (req.file) {  // Si il y a une  nouvelle image il faut supprimer la précedente avant de modifier la sauce

        Sauces.findOne({ _id: req.params.id })
            .then(sauce => {
                const filename = sauce.fileName;
                fs.unlink(`images/${filename}`, () => {

                    const sauceObject = {
                        ...JSON.parse(req.body.sauce), fileName: req.file.filename        // /!\ 13/12 Modif de faite /!\ /!\ Modif de faite /!\ /!\ Modif de faite /!\   
                    }

                    Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce modifié!' }))
                        .catch(error => res.status(500).json({ error }));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {   // Si on modifie pas l'image, on met à jour la sauce sans toucher aux images
        const sauceObject = { ...req.body };
        Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifié!' }))
            .catch(error => res.status(500).json({ error }))
    };
}


exports.deleteSauce = (req, res) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.fileName;
            fs.unlink(`images/${filename}`, () => {

                Sauces.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(500).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};


exports.likeSauce = (req, res) => {
    const userId = req.body.userId;
    const like = req.body.like;
    const sauceId = req.params.id;
    Sauces.findOne({ _id: sauceId })
        .then(sauce => {

            // On garde dans le tableau des users ayant aimé/disliké , sauf l'user qu'on traite actuellement
            sauce.usersLiked = sauce.usersLiked.filter(_userId => userId !== _userId)
            sauce.usersDisliked = sauce.usersDisliked.filter(_userId => userId !== _userId)
            switch (like) {
                case 1:  //   CAS n°1: sauce liked
                    sauce.usersLiked.push(userId)
                    break;
                case -1:  //  CAS n°2: sauce disliked
                    sauce.usersDisliked.push(userId)
                    break;


            };

            sauce.save()
                .then(() => res.status(200).json({ message: 'Sauce evaluée !' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
}



//Commentaire
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