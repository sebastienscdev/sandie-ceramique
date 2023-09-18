<template>
    <v-container>
        <h2 class="text-h6 mb-4">Gestion du Backoffice</h2>

        <!-- Formulaire pour ajouter un nouveau produit -->
        <v-form @submit.prevent="addProduct">
            <template>
                <v-tabs id="displayPrev" color="black" fixed-tabs v-model="activeTab">
                    <v-tabs-slider color="#c6eadc"></v-tabs-slider>
                    <v-tab :key="0">Création de produit</v-tab>
                    <v-tab :key="1">Liste des produits</v-tab>

                    <v-tab-item class="pt-4" :key="0">
                        <v-form @submit.prevent="addProduct">
                            <!-- Champ d'ajout d'image -->
                            <v-file-input outlined dense v-model="newProduct.image" label="Image du produit" accept="image/*" @change="onImageChange" :rules="imageRules" required></v-file-input>

                            <!-- Aperçu de l'image (affiché uniquement lorsque newProduct.image est défini) -->
                            <v-img class="mb-6" contain v-if="newProduct.imageSrc" :src="newProduct.imageSrc" max-width="100%" height="200"></v-img>

                            <!-- Champs pour les détails du produit (nom, description, prix, etc.) -->
                            <!-- Utilisez les composants Vuetify avec v-model pour lier les données du formulaire à des variables dans le modèle -->
                            <v-text-field outlined dense v-model="newProduct.productName" label="Nom du produit" required></v-text-field>
                            <v-textarea outlined dense v-model="newProduct.productDescription" label="Description du produit (max 100 caractères)" :counter="`${descriptionCounter} caractères restants`" @input="limitDescription" @keydown="preventExcessDescription" required></v-textarea>
                            <v-row>
                                <v-col cols="12" sm="6" lg="12">
                                    <v-text-field hide-details outlined dense v-model="newProduct.productPrice" label="Prix du produit" required append-inner-icon="mdi-currency-eur"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" lg="12">
                                    <v-text-field hide-details outlined dense v-model="newProduct.Quantity" label="Quantité" required></v-text-field>
                                </v-col>
                            </v-row>
                            <!-- Ajoutez d'autres champs selon vos besoins -->

                            <!-- Bouton pour soumettre le formulaire -->
                            <v-btn rounded elevation="0" type="submit" class="dynamic-gradient-button mt-6">Ajouter le produit</v-btn>
                        </v-form>
                    </v-tab-item>

                    <v-tab-item class="pt-4" :key="1">
                        <!-- Liste des produits existants -->
                        <v-list>
                            <v-list-item v-for="(product, index) in newProduct" :key="index" class="product__list">
                                <v-checkbox v-model="product.available" color="#81b7a2" class="mr-2"></v-checkbox>

                                <!-- Image à gauche -->
                                <v-img :src="product.imageSrc" class="product__image" alt="Product Image" height="100px" max-width="100px"></v-img>

                                <!-- Texte à droite -->
                                <v-list-item-content class="product__text">
                                    <v-list-item-title class="product__title">{{ product.productName }}</v-list-item-title>
                                    <v-list-item-subtitle class="product__subtitle">{{ product.productDescription }}</v-list-item-subtitle>
                                    <v-list-item-subtitle class="product__subtitle">{{ product.productPrice }} €</v-list-item-subtitle>
                                    <!-- v-chip to display 'Épuisé' when not available -->
                                    <v-list-item-action class="chipAvailable ma-0">
                                        <v-fade-transition>
                                            <v-chip v-if="!product.available" color="error">Épuisé</v-chip>
                                        </v-fade-transition>
                                    </v-list-item-action>
                                </v-list-item-content>

                                <!-- Boutons d'action à droite -->
                                <v-list-item-action>
                                    <v-btn elevation="0" class="ma-2" fab dark x-small color="#fb9f89ff" @click="deleteProduct(index)">
                                        <v-icon dark>
                                            mdi-delete
                                        </v-icon>
                                    </v-btn>

                                    <v-btn elevation="0" class="ma-2" fab dark x-small color="#81b7a2" @click="editProduct(index)">
                                        <v-icon dark>
                                            mdi-pencil-circle-outline
                                        </v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </v-tab-item>
                </v-tabs>
            </template>
        </v-form>

        <!-- Snackbar for successful form submission -->
        <v-snackbar v-model="snackbarVisible" :timeout="snackbarTimeout" absolute bottom color="success">
            <p class="text-center mb-0">Votre Produit a été ajouté avec succès!</p>
        </v-snackbar>

    </v-container>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/storage';

export default {
    data() {
        return {
            activeTab: 0, // Onglet actif par défaut (1 pour la création de produit)
            snackbarVisible: false, // Initially hidden
            snackbarTimeout: -1, // Keep the snackbar open until manually closed
            userProducts: [], // Nouvelle liste pour les produits créés par l'utilisateur

            newProduct: {
                productName: '',
                productDescription: '',
                imageSrc: null, // Pour stocker l'image
                productPrice: '',
                Quantity: '',
            },

            products: [],

            descriptionCounter: 100,

            imagePreview: null, // Pour stocker l'aperçu de l'image

            imageRules: [
                (v) => !!v || 'L\'image est requise',
                (v) => !v || v.size < 2000000 || 'La taille de l\'image doit être inférieure à 2 Mo',
            ],
        };
    },
    methods: {
        async addProduct() {
            try {
                // Vérifiez si les propriétés requises sont définies
                if (
                    !this.newProduct.productName ||
                    !this.newProduct.productDescription ||
                    !this.newProduct.productPrice ||
                    !this.newProduct.Quantity
                ) {
                    console.error('Veuillez remplir tous les champs obligatoires.');
                    return;
                }

                // Téléchargez l'image vers Firebase Storage
                const imageFile = this.newProduct.image;
                const imageStorageRef = firebase.storage().ref('images/' + imageFile.name);
                const snapshot = await imageStorageRef.put(imageFile);

                // Récupérez l'URL de téléchargement de l'image
                const imageUrl = await snapshot.ref.getDownloadURL();

                // Créez un nouvel objet de produit avec les propriétés nécessaires
                const newProduct = {
                    productName: this.newProduct.productName,
                    productDescription: this.newProduct.productDescription,
                    productPrice: this.newProduct.productPrice,
                    Quantity: this.newProduct.Quantity,
                    imageSrc: imageUrl, // Champ d'imageSrc avec l'URL
                };

                // Accédez à Firestore et ajoutez le nouveau produit
                await this.$firebase.firestore().collection('produits').add(newProduct);

                // Réinitialisez le formulaire ou effectuez d'autres actions après l'ajout
                // this.resetForm();

                // Affichez une notification ou un message de succès si nécessaire
                this.snackbarVisible = true;
            } catch (error) {
                console.error("Erreur lors de l'ajout du nouveau produit :", error);
                // Gérez les erreurs, affichez une notification d'erreur, etc.
            }
        },
        async fetchProducts() {
            try {
                const querySnapshot = await firebase.firestore().collection("produits").get();
                this.products = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("Fetched products:", this.products); // Log the products to the console
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        },
        async created() {
            // Fetch products from Firestore when the component is created
            await this.fetchProducts();
        },
        onImageChange() {
            // Mettre à jour l'aperçu de l'image
            if (this.newProduct.image) {
                // Vérifiez si l'objet image contient une propriété name
                if (this.newProduct.image.name) {
                    // Créez un objet URL à partir de l'image sélectionnée
                    this.imagePreview = URL.createObjectURL(this.newProduct.image);
                } else {
                    // Si la propriété name est absente, affichez un message d'erreur ou traitez l'erreur
                    console.error("L'objet image ne contient pas de propriété 'name'");
                }
            } else {
                // Si l'image est effacée ou non sélectionnée, réinitialisez l'aperçu
                this.imagePreview = null;
            }
        },
        limitDescription() {
            // Limiter la description à 100 caractères maximum
            if (this.newProduct.description.length > 100) {
                this.newProduct.description = this.newProduct.description.substring(0, 100);
            }
            this.descriptionCounter = 100 - this.newProduct.description.length;
        },
        preventExcessDescription(event) {
            // Empêcher d'ajouter du texte une fois la limite atteinte
            if (this.newProduct.description.length >= 100 && event.key !== 'Backspace') {
                event.preventDefault();
            }
        },
        editProduct() {
            // Ajoutez le code pour modifier un produit existant
            // Vous pouvez ouvrir un formulaire de modification avec les détails du produit
            // et mettre à jour this.products[index] avec les nouvelles valeurs
        },
        deleteProduct() {
            // Ajoutez le code pour supprimer un produit de la liste
            // Vous pouvez utiliser this.products.splice(index, 1) pour le supprimer
        },
    },
};
</script>

<style lang="scss">
#displayPrev .v-slide-group.v-item-group>.v-slide-group__next,
.v-slide-group.v-item-group>.v-slide-group__prev {
    display: none !important;
}
</style>

<style lang="scss" scoped>
@import "@/assets/custom-variables.scss";

.chipAvailable {
    position: absolute;
    left: 74px;
}

.product {
    &__image {
        position: relative;
    }

    &__list {
        border-bottom: 1px solid lightgray;
    }

    &__text {
        text-align: left;
        padding-left: 10px;
    }

    &__title {
        font-weight: 600;
    }

    &__subtitle {
        font-weight: 500;
    }
}

// Define a CSS animation for the gradient background
@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 100% 50%;
    }
}

// Define the button style with the animated gradient
.dynamic-gradient-button {
    background: linear-gradient(90deg, $khaki, $cambridge-blue); // Define your gradient colors here
    // Customize gradient direction and colors as needed
    color: #fff; // Set text color for contrast
    // You can add more styles as needed
    // Apply the animation
    animation: gradientAnimation 1s linear infinite; // Adjust the animation duration (3s in this example)
}
</style>
