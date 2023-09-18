<template>
    <div class="pa-4">

        <div v-if="cartData && cartData.length === 0">
            <p class="mt-2">Votre panier est vide.</p>
            <v-btn class="mt-4" rounded :color="buttonColor" @click="goToProducts()">{{ buttonText }}</v-btn>

        </div>
        <div v-else>
            <div v-for="(cartItem, index) in cartData" :key="index" lg="4">
                <div v-for="(item, itemIndex) in cartItem.items" :key="itemIndex">
                    <div class="basket__content">
                        <!-- <v-img :src="cartItem.product.image" alt="Product Image" max-width="120px" max-height="120px"></v-img> -->
                        <div class="basket__contentContext pl-5">
                            <p class="basket__content--titre mb-0">{{ item.Nom }}</p>
                            <p class="basket__content--text ellipsis mb-0">{{ item.Description }}</p>
                            <p class="basket__content--text mb-0">Quantité: {{ item.Quantite || 0 }} - Prix: {{ item.Prix }} €</p>
                            <div class="d-flex justify-end">
                                <v-btn class="mx-1" elevation="0" fab dark x-small color="#fb9f89ff" @click="removeCart(item.productId)">
                                    <v-icon dark>mdi-delete</v-icon>
                                </v-btn>

                                <v-btn class="mx-1" elevation="0" v-if="item.Quantite > 1" fab dark x-small color="#fb9f89ff" @click="decrementQuantity(cartItem.productId)">
                                    <v-icon dark>mdi-minus</v-icon>
                                </v-btn>

                                <v-btn class="mx-1" elevation="0" fab dark x-small color="#fb9f89ff" @click="incrementQuantity(item.productId)">
                                    <v-icon dark>mdi-plus</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
    name: 'BasketView',
    data() {
        return {
            cartData: [],
            buttonText: "Voir les produits",
            buttonColor: "dynamic-gradient-button",
            // Initialisez le panier comme un tableau vide
        };
    },
    created() {
        // Récupérez les données du panier depuis Firestore lors de la création de la page
        console.log('Le composant basketView est monté.');
        this.fetchData();
    },
    methods: {
        goToProducts() {
            this.$router.push('/about');
        },
        async fetchData() {
            try {
                const db = firebase.firestore();
                const cartRef = db.collection('panier');

                console.log('carRef', cartRef.id)

                const cartQuerySnapshot = await cartRef.get();
                console.log('Cart query snapshot', cartQuerySnapshot);

                const cartData = [];

                cartQuerySnapshot.forEach((doc) => {
                    const cartItem = doc.data();
                    cartData.push(cartItem);
                    console.log('Cart', cartItem)
                });

                this.cartData = cartData || [];
            } catch (error) {
                console.error('Erreur lors de la récupération du panier depuis Firestore:', error);
            }
        },
        async removeCart(cartId) {
            try {
                const db = firebase.firestore();
                const cartRef = db.collection("panier").doc(cartId);

                // Obtenez la liste des items associés à ce panier
                const itemsQuerySnapshot = await cartRef.collection("items").get();

                // Supprimez tous les items associés à ce panier
                itemsQuerySnapshot.forEach(async (itemDoc) => {
                    await itemDoc.ref.delete();
                });

                // Enfin, supprimez le document du panier lui-même
                await cartRef.delete();

                console.log('Document du panier supprimé avec l\'ID :', cartId);
            } catch (error) {
                console.error('Erreur lors de la suppression du document du panier :', error);
            }
        },

        decrementQuantity() {
            // Décrémentez la quantité du produit dans le panier dans Firestore
            // Mettez à jour également le panier dans Vuex ou tout autre endroit où vous stockez les données du panier
            // ...
        },
        incrementQuantity() {
            // Incrémente la quantité du produit dans le panier dans Firestore
            // Mettez à jour également le panier dans Vuex ou tout autre endroit où vous stockez les données du panier
            // ...
        },
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

.ellipsis {
    display: block;
    display: -webkit-box;
    max-height: 3.6em;
    /* (Nombre de lignes souhaité * ligne-height) */
    margin-right: -1px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    /* Nombre de lignes souhaité */
    -webkit-box-orient: vertical;
}

.basket {
    &__contentContext {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }

    &__content {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 10px 10px 10px 10px;
        border-bottom: 1px solid #ccc;

        &--titre {
            font-size: .9rem !important;
            font-weight: bold;
            text-transform: uppercase;
            color: cadetblue;
            text-align: left;
        }

        &--text {
            font-size: .9rem;
            font-weight: 400;
            text-align: left;
        }

        &--price {
            font-size: .9rem;
            font-weight: 400;
            text-align: left;
        }
    }
}
</style>
