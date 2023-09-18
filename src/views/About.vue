<template>
    <div class="pa-4">
        <v-row>
            <v-col v-for="product in products" :key="product.id" lg="3" xs="12">
                <ProductCard :image-src="product.imageSrc" :product-name="product.productName" :product-description="product.productDescription" :product-price="product.productPrice" :product-activity="product.productActivity" :button-color="buttonColor" :button-text="buttonText" @add-to-cart="addToCart(product)" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import ProductCard from "@/components/productCard";
import firebase from 'firebase/app';

export default {
    name: 'AboutMe',
    components: {
        ProductCard
    },
    data() {
        return {
            buttonText: "Ajouter au panier",
            buttonColor: "dynamic-gradient-button",
            products: [], // Initialize products as an empty array
        };
    },

    methods: {
        async addToCart(product) {
            // Ajoutez le produit au panier Firestore
            try {
                const db = firebase.firestore();
                const cartRef = db.collection('panier');

                // Le produit n'existe pas dans le panier, ajoutez-le
                await cartRef.add({
                    items: [{
                        productId: product.id,
                        Nom: product.productName,
                        Description: product.productDescription,
                        Prix: product.productPrice,
                        Quantité: product.Quantity,
                    }]
                });
                this.$router.push('/basket');
            } catch (error) {
                console.error("Erreur lors de l'ajout au panier :", error);
            }
        },
    },

    async created() {
        // Fetch products from Firestore
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
}
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
</style>
