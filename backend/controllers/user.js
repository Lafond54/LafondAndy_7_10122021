const { User } = require('../database');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');





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
      if(user) {
          res.status(200).json(user); // Exclure le password dans la réponse ?
          //  Pas de verif de l'id depuis le back, du coup tout le monde peut voir la bdd avec n'importe quelle req.params.Id?
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
      if(user) {
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