<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <div>
                    <v-card-title class="text-h6">Admin Login</v-card-title>
                    <v-card-text>
                        <form @submit.prevent="loginAdmin">
                            <!-- Admin login form fields (e.g., username and password) -->
                            <v-text-field dense v-model="username" label="Username" required outlined></v-text-field>
                            <v-text-field dense v-model="password" label="Password" type="password" required outlined></v-text-field>

                            <v-btn rounded elevation="0" type="submit" class="dynamic-gradient-button mt-6">Se connecter</v-btn>
                            <v-btn rounded elevation="0" @click="logout" class="error ml-4 mt-6">Déconnexion</v-btn>
                        </form>
                    </v-card-text>
                </div>
            </v-col>
        </v-row>
        <!-- Formulaire d'inscription
        <form @submit.prevent="signupAdmin">
            <v-text-field v-model="signupEmail" label="E-mail" required outlined></v-text-field>
            <v-text-field v-model="signupPassword" label="Mot de passe" type="password" required outlined></v-text-field>
            <v-btn type="submit" class="dynamic-gradient-button mt-6">S'inscrire</v-btn>
        </form>
        <v-btn @click="logout" class="error ml-4 mt-6">Déconnexion</v-btn> -->
    </v-container>
</template>

<script>
// import {
//     mapMutations
// } from 'vuex'; 

import firebase from 'firebase/app';
import 'firebase/auth'; // Assurez-vous d'importer le module d'authentification Firebase

export default {
    name: "adminLogin",
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        async loginAdmin() {
            try {
                const userCredential = await firebase.auth().signInWithEmailAndPassword(this.username, this.password);

                // Vérifiez si l'utilisateur est connecté
                if (userCredential.user) {
                    // Utilisateur connecté avec succès
                    console.log('Utilisateur connecté :', userCredential.user);

                    // Redirigez l'utilisateur vers la page BackOffice
                    this.$router.push({path:'/backOffice'});

                } else {
                    // L'utilisateur n'est pas connecté (erreur inattendue)
                    console.error('Erreur de connexion : utilisateur non connecté.');
                }
            } catch (error) {
                // Gérez les erreurs de connexion Firebase
                console.error('Erreur de connexion :', error);
                alert('Invalid credentials. Please try again.'); // Affichez un message d'erreur si la connexion échoue
            }
        },
        // async signupAdmin() {
        //   try {
        //     const userCredential = await this.$firebase.auth().createUserWithEmailAndPassword(this.signupEmail, this.signupPassword);
        //     console.log('Utilisateur inscrit :', userCredential.user);
        //   } catch (error) {
        //     console.error('Erreur d\'inscription :', error);
        //   }
        // },
        async logout() {
            try {
                await firebase.auth().signOut();
                console.log('Utilisateur déconnecté');
            } catch (error) {
                console.error('Erreur de déconnexion :', error);
            }
        },
        // methods: {
        //     ...mapMutations(['setIsAdmin']), // Import the setIsAdmin mutation

        //     loginAdmin() {
        //         // Temporary login credentials for testing
        //         const tempUsername = 'admin';
        //         const tempPassword = 'password';

        //         if (this.username === tempUsername && this.password === tempPassword) {
        //             // Set the user information in the store
        //             this.$store.commit('setUser', {
        //                 username: this.username,
        //                 role: 'admin', // Assuming the role is 'admin' for admin users
        //             });

        //             // Redirect to the admin panel (replace with your actual route)
        //             this.$router.push('/backOffice');

        //             // Set isAdmin to true upon successful login
        //             this.setIsAdmin(true); // Use the mutation to update isAdmin
        //         } else {
        //             // Display an error message (replace with your error handling logic)
        //             alert('Invalid credentials. Please try again.');
        //         }
        //     },
        //     logout() {
        //         // Clear the user data by committing the "clearUser" mutation
        //         this.$store.commit('clearUser');

        //         // Redirect to the home page or another appropriate route
        //         this.$router.push('/'); // Replace with your desired route
        //     },

        // },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/custom-variables.scss";

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
