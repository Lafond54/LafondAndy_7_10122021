const { User } = require('../database');
const fs = require('fs');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


// Normalizer infos user
// Pour les images d'utilisateur
function normalizer(user, req) {
  return { id: user.id, lastName: user.lastName, firstName: user.firstName, isadmin: user.isadmin, imgUrl: user.avatar && `${req.protocol}://${req.get("host")}/${user.avatar}` }

}
// Pour my profile
function normalizerFull(user, req) {
  return { ...normalizer(user, req), email: user.email, isadmin: user.isadmin }
}



exports.signup = (req, res, next) => {
  if (!(req.body.firstName && req.body.lastName && req.body.email && req.body.password))
    return res.status(400).json({ message: 'Un des champs est vide' })
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      User.create({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: hash


      })

        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => {
      res.status(500).json({ error })
      console.error(error)
    });
};



exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      console.log('Compare', req.body.password, user)
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              process.env.RTOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


// Voir mon profil
exports.getUserProfile = (req, res) => {
  //recupéré userId
  // const token = req.headers.authorization.split(' ')[1];
  // const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  // // const userId = decodedToken.userId

  User.findOne({
    where: { id: req.params.id }
  })
    .then(user => {
      if (user) {
        res.status(200).json(req.query.full && req.userId === user.id ? normalizerFull(user, req) : normalizer(user, req));

      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(404).json({ error: 'Utilisateur non trouvé' })
    });
}


// DELETE
// Suppression de l'user
exports.deleteAccount = (req, res, next) => {
  User.findOne({
    where: { id: req.params.id }
  })
    .then(user => {
      if (user) {
        user.destroy()
          .then(() => res.status(200).json({ message: 'Compte supprimé' }))
          .catch(() => res.status(500).json({ error: 'Suppression du profil échoué' }));

      } else {
        return res.status(404).json({ error: 'Utilisateur non trouvé' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: 'Suppression du profil échoué' })
    });
}

// PUT
// Modification de l'user
exports.modifyAccount = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token,  process.env.RTOKEN);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { id: req.params.id } })
  try {
    if (!user) { return res.status(404).json({ message: "utilisateur non trouvé" }) }
    if (user.id !== userId) { return res.status(403).json({ message: "Vous n'avez pas le droit de modifier cet utilisateur" }) }
    if (req.body.lastname)
      user.set({
        lastName: req.body.lastname,
      })
    if (req.body.firstname) user.set({
      firstName: req.body.firstname
    })
    if (req.body.email) user.set({
      email: req.body.email,
    })
    if (req.body.password)
      user.set({
        password: await bcrypt.hash(req.body.password, 10),
      })

    // todo Essai hash du mdp :
    // {
    //   bcrypt.hash(req.body.password, 10)
    //   .then(hash => {
    //     user.set({
    //       password: hash,
    //     })

    //       .then(() => res.status(201).json({ message: 'MDP modifié !' }))
    //       .catch(error => res.status(400).json({ error }));
    //   })
    //   .catch(error => {
    //     res.status(500).json({ error })
    //     console.error(error)
    //   });
    // }

    if (req.file) {
      if (user.avatar) fs.unlinkSync(user.avatar)
      user.set({
        avatar: `images/${req.file.filename}`
      })
    }
    //todo essai FS image avatar :
    // if (req.file) {
    //   const filename = user.avatar;

    //   fs.unlink(`${filename}`, () => {
    //     user.set({
    //       avatar: `images/${req.file.filename}`
    //     })
    //       .then(() => res.status(200).json({ message: 'Avatar modifié' }))
    //       .catch(() => res.status(500).json({ error: 'Changement avatar échoué' }));
    //   })

    // } else {
    //   return res.status(404).json({ error: 'Image avat non trouvée' })
    // }


    res.status(200).json(normalizerFull( await user.save(), req))



  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Modification du profil échoué' })
  }
}