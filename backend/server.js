// import express from 'express';
// import { createConnection } from 'mysql2'; // Utilisez le pilote MySQL2
// import cors from 'cors';

// const app = express();
// const port = 3306; // Port sur lequel votre serveur écoutera
// app.use(cors()); // Enable CORS to allow requests from your Vue.js front-end


// // Configuration de la connexion à la base de données MySQL
// const db = createConnection({
//     host: 'cluster021.hosting.ovh.net', // Votre hôte de base de données
//     user: 'spezzar3', // Votre nom d'utilisateur MySQL
//     database: 'spezzar3', // Le nom de votre base de données
//     password: '8Cs6m8kkcK3Y', // Votre mot de passe MySQL
// });

// // Route pour récupérer tous les produits
// app.get('/api/produits', (req, res) => {
//     // Exécutez une requête SQL pour récupérer les produits depuis la base de données
//     db.query('SELECT * FROM produits', (err, results) => {
//       if (err) {
//         console.error('Erreur lors de la récupération des produits :', err);
//         res.status(500).json({ error: 'Erreur lors de la récupération des produits.' });
//       } else {
//         // Renvoyez les résultats en tant que réponse JSON
//         res.json(results);
//       }
//     });
//   });

// // Testez la connexion à la base de données
// db.connect((err) => {
//   if (err) {
//     console.error('Erreur de connexion à la base de données :', err);
//   } else {
//     console.log('Connexion à la base de données réussie.');
//   }
// });

// // Ajoutez ici vos endpoints API pour interagir avec la base de données MySQL

// // Démarrez le serveur
// app.listen(port, () => {
//   console.log(`Serveur backend en cours d'exécution sur le port ${port}`);
// });
