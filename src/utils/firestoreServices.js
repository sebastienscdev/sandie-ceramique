// firestoreServices.js
import 'firebase/firestore'; // Importez les services Firebase dont vous avez besoin
import { db } from './firebaseConfig'; // Assurez-vous d'importer la configuration correctement


// Fonction pour ajouter un produit à Firestore
export async function createProduct(newProduct) {
  try {
    await db.collection('produits').add(newProduct);
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit :", error);
    throw error; // Rejeter l'erreur pour la gestion des erreurs à un niveau supérieur
  }
}