<template>
    <v-card class="product-card" elevation="2">
        <!-- Image en haut -->
        <v-img :src="imageSrc" alt="Product Image" height="250px" max-height="100%" width="100%"></v-img>

        <!-- Contenu de la carte -->
        <v-card-title class="title">{{ productName }}</v-card-title>
        <v-card-text class="description">{{ productDescription }}</v-card-text>
        <div class="prix pa-4">
            <v-chip color="lightGray" class="keyword-chip mr-2" v-if="productActivity === 'épuisé'">
                <p class="mb-0">{{ productActivity }}</p>
            </v-chip>
            <v-chip color="#609ea0" class="keyword-chip mr-2" v-if="productActivity === 'Nouveauté'">
                <p class="mb-0">{{ productActivity }}</p>
            </v-chip>
            <v-chip color="red" class="keyword-chip mr-2" v-if="productActivity === 'Réservé'">
                <p class="mb-0">{{ productActivity }}</p>
            </v-chip>
            <v-chip v-if="productPrice">
                <p class="product-card--text mb-0">{{ productPrice }} €</p>
            </v-chip>
        </div>

        <!-- Bouton pour acheter le produit -->
        <v-card-actions class="d-flex justify-center">
            <v-btn class="mb-4" rounded :color="buttonColor" @click="addToCart()">{{ buttonText }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'ProductCard',
    data() {
        return {}
    },
    props: {
        imageSrc: String,
        productName: String,
        productActivity: String,
        productDescription: String,
        productPrice: [Number, String],
        buttonColor: String,
        buttonText: String,
    },
    methods: {
        addToCart() {
			this.$emit('add-to-cart');
		}
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/custom-variables.scss";

// Define the button style with the animated gradient
.dynamic-gradient-button {
    background: linear-gradient(90deg, $khaki, $cambridge-blue); // Define your gradient colors here
    // Customize gradient direction and colors as needed
    color: #fff; // Set text color for contrast
    // You can add more styles as needed
    // Apply the animation
    animation: gradientAnimation 1s linear infinite; // Adjust the animation duration (3s in this example)
}

.product-card {
    max-width: 300px;
    /* Largeur maximale de la carte */
    margin: 0 auto;
    /* Centrer la carte horizontalement */

    &--text {
        font-size: 1rem;
        font-weight: 600;
    }
}

@media only screen and (max-width: 495px) {
    .product-card {
        max-width: 100%;
        /* Largeur maximale de la carte */
        margin: 0 auto;
        /* Centrer la carte horizontalement */
    }
}

.keyword-chip {
    background: #609ea0;
    color: white;
}

.title {
    font-size: 1.25rem !important;
    font-weight: bold;
    text-transform: uppercase;
    color: cadetblue;
}

.description {
    font-size: 14px;
    font-weight: 400;
    text-align: left;
}

.prix {
    text-align: right;
    font-weight: 600;
}
</style>
