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