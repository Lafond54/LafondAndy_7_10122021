const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const path = require('path');
const sqlite3 = require('sqlite3')
require('dotenv').config()

// BDD :  Sync de Sequelize avec la BDD
const { sequelize } = require('./database');
sequelize.sync().then(() => console.log('db is ready'));


//Creer une application express
const app = express();
//







//********************* Rend le serveur accessible par d'autres origines  *************************
app.use(cors());



// Definit que l'on utilise du JSON pour le passage et la recuperation de parametre (bodyparser)
app.use(express.json());


//  analyse les requêtes entrantes avec des charges utiles JSON et est basé sur body-parser
app.use(express.urlencoded({ extended: true }))

//
// express.static : middleware pour rendre possible l'accès aux fichiers de ce dossier via HTTP.

app.use('/images', express.static(path.join(__dirname, 'images')));



//  Déclaration des require pour les Routes
const ArticleRoutes = require('./routes/article');
const CommentaireRoutes = require('./routes/commentaire');
const userRoutes = require('./routes/user');
const dbname = 'main.db'


// Routes + //Helmet protéger votre application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP
app.use('/', helmet(), ArticleRoutes);
app.use('/', helmet(), CommentaireRoutes);
app.use('/user', helmet(), userRoutes);




// *************************************
module.exports = app;


