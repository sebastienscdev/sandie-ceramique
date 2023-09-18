<template>
    <v-container>
        <h2 class="text-h6 mb-4">Formulaire de Contact</h2>

        <v-form @submit.prevent="submitForm">
            <!-- Nom -->
            <v-text-field outlined dense v-model="formData.nom" label="Nom" required :rules="nameRules" :error-messages="nomError"></v-text-field>

            <!-- Prénom -->
            <v-text-field outlined dense v-model="formData.prenom" label="Prénom" required :rules="nameRules" :error-messages="prenomError"></v-text-field>

            <!-- Adresse mail -->
            <v-text-field outlined dense v-model="formData.email" label="Adresse mail" required type="email" :rules="emailRules" :error-messages="emailError"></v-text-field>

            <!-- Téléphone -->
            <v-text-field outlined dense v-model="formData.telephone" label="Téléphone" required :rules="telephoneRules" :error-messages="telephoneError"></v-text-field>

            <!-- Message -->
            <v-textarea outlined dense v-model="formData.information" label="Description du produit (max 100 caractères)" :counter="`${descriptionCounter} caractères restants`" @input="limitDescription" @keydown="preventExcessDescription"></v-textarea>

            <!-- Bouton pour soumettre le formulaire -->
            <v-btn rounded elevation="0" type="submit" class="dynamic-gradient-button mt-6">Envoyer vos informations</v-btn>

        </v-form>
        <!-- Snackbar for successful form submission -->
        <v-snackbar v-model="snackbarVisible" :timeout="snackbarTimeout" absolute bottom color="success">
            <p class="text-center mb-0">Vos informations ont été envoyées avec succès!</p>
        </v-snackbar>

    </v-container>
</template>

<script>
import firebase from 'firebase/app'; // Importez Firebase ici
import 'firebase/firestore'; // Importez les services Firebase nécessaires

import {
    createEmailRules,
    createTelephoneRules,
    createNameRule,
} from '@/utils/validationServices.js'; // Adjust the import path as needed

export default {
    name: 'contactPage',
    data() {
        return {
            formData: {
                nom: '',
                prenom: '',
                email: '',
                telephone: '',
                information: '',
            },
            emailRules: createEmailRules(),
            telephoneRules: createTelephoneRules(),
            nameRules: createNameRule(),
            descriptionCounter: 100,
            snackbarVisible: false, // Initially hidden
            snackbarTimeout: -1, // Keep the snackbar open until manually closed
            nomError: '',
            prenomError: '',
            emailError: '',
            telephoneError: '',
            isSubmitting: false,
        };
    },
    methods: {
        submitFormBack() {
            // Send the form data to your backend or perform any other action here
            // Access the form data using this.formData
            // You can validate and submit the data to your server or perform any other necessary logic

        },

        clearErrorMessages() {
            this.nomError = '';
            this.prenomError = '';
            this.emailError = '';
            this.telephoneError = '';
        },
        async submitForm() {
            // Clear previous error messages
            this.clearErrorMessages();

            // Validate the form data
            if (this.validateForm()) {
                // Set the isSubmitting flag to true to indicate that the form is being submitted
                this.isSubmitting = true;

                try {
                    // Créez une référence à la collection Firestore où vous souhaitez stocker les données du formulaire
                    const db = firebase.firestore();
                    const collection = db.collection('contacts'); // Remplacez 'contacts' par le nom de votre collection

                    // Enregistrez les données du formulaire dans la collection Firestore
                    await collection.add(this.formData);

                    // Show the snackbar on successful form submission
                    this.snackbarVisible = true;

                    // Optionally, you can hide the snackbar after a certain delay
                    setTimeout(() => {
                        this.snackbarVisible = false;
                    }, 8000); // Hide after 8 seconds (adjust the duration as needed)

                    // Réinitialisez le formulaire et effacez le drapeau isSubmitting
                    this.resetForm();
                } catch (error) {
                    console.error('Erreur lors de l\'enregistrement des données du formulaire :', error);
                    // Vous pouvez gérer les erreurs ici (par exemple, afficher un message d'erreur à l'utilisateur)
                }
            }
        },

        validateForm() {
            const {
                nom,
                prenom,
                email,
                telephone
            } = this.formData;
            const errors = {
                nom: nom.trim() === '' ? 'Ce champ est requis.' : '',
                prenom: prenom.trim() === '' ? 'Ce champ est requis.' : '',
                email: email.trim() === '' ? 'Ce champ est requis.' : '',
                telephone: telephone.trim() === '' ? 'Ce champ est requis.' : '',
            };

            if (email.trim() !== '' && !this.emailRules[0](email)) {
                errors.email = 'Adresse mail invalide.';
            }

            if (telephone.trim() !== '' && !this.telephoneRules[1](telephone)) {
                errors.telephone = 'Format de téléphone invalide.';
            }

            // Set error messages
            this.nomError = errors.nom;
            this.prenomError = errors.prenom;
            this.emailError = errors.email;
            this.telephoneError = errors.telephone;

            // Check if there are any errors
            return Object.values(errors).every((error) => error === '');
        },

        resetForm() {
            // Define an array of form field names to reset
            const fieldsToReset = ['nom', 'prenom', 'email', 'telephone', 'information'];

            // Reset the form data and error messages for each field
            fieldsToReset.forEach(fieldName => {
                this.formData[fieldName] = '';
                this[`${fieldName}Error`] = '';
            });

            // Reset the isSubmitting flag
            this.isSubmitting = false;
        },

        limitDescription() {
            // Limiter la description à 100 caractères maximum
            if (this.formData.information.length > 100) {
                this.formData.information = this.formData.information.substring(0, 100);
            }
            this.descriptionCounter = 100 - this.formData.information.length;
        },
        preventExcessDescription(event) {
            // Empêcher d'ajouter du texte une fois la limite atteinte
            if (this.formData.information.length >= 100 && event.key !== 'Backspace') {
                event.preventDefault();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/custom-variables.scss";

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
