    // store.js
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export default new Vuex.Store({
    state: {
        cart: [], // An array to store the products in the cart
        products: [], // La liste des produits
        isAdmin: false, // Initial state
        user: null, // Initialize the user to null
    },
    
    mutations: {
        setUser(state, user) {
            state.user = user;
        },

        setIsAdmin(state, isAdmin) {
            state.user.isAdmin = isAdmin;
        },

        clearUser(state) {
            state.user = null; // Clear user data when logging out
        },
        
        addToCart(state, product) {
        // Check if the product is already in the cart
        const existingProductIndex = state.cart.findIndex((item) => item.product.name === product.name);

            if (existingProductIndex !== -1) {
                // If the product is already in the cart, increment its quantity
                state.cart[existingProductIndex].quantity++;
            } else {
                // If it's not in the cart, add it with quantity 1
                state.cart.push({ product, quantity: 1 });
            }
        },
        removeFromCart(state, index) {
        state.cart.splice(index, 1);
        },
        decrementQuantity(state, index) {
        // Decrement the quantity of a product in the cart
        if (state.cart[index].quantity > 1) {
            state.cart[index].quantity--;
        } else {
            // If the quantity is 1, remove the product from the cart
            state.cart.splice(index, 1);
        }
        },
        updateCartItem(state, { index, product }) {
            // Update the cart item at the specified index with the modified product
            if (index >= 0 && index < state.cart.length) {
            state.cart.splice(index, 1, product);
            }
        },
        // Les mutations pour mettre à jour l'état des produits
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
        ADD_PRODUCT(state, product) {
            state.products.push(product);
        },
        UPDATE_PRODUCT(state, updatedProduct) {
            const index = state.products.findIndex((product) => product.id === updatedProduct.id);
            if (index !== -1) {
            state.products[index] = updatedProduct;
            }
        },
        DELETE_PRODUCT(state, productId) {
            state.products = state.products.filter((product) => product.id !== productId);
        },
    },
    actions: {
        addProductToCart({ commit }, product) {
        commit('addToCart', product);
        },
        removeProductFromCart({ commit }, index) {
        commit('removeFromCart', index);
        },
        decrementProductQuantity({ commit }, index) {
        commit('decrementQuantity', index);
        },

        fetchProducts({ commit }) {
            // Ici, vous pouvez appeler votre API ou votre base de données pour récupérer la liste des produits
            // Une fois les données récupérées, utilisez la mutation SET_PRODUCTS pour mettre à jour l'état
            const products = []; // Remplacez ceci par les données réelles
            commit('SET_PRODUCTS', products);
        },

        createProduct({ commit }, ) {
            // Ici, vous pouvez appeler votre API ou votre base de données pour ajouter un nouveau produit
            // Une fois le produit ajouté avec succès, utilisez la mutation ADD_PRODUCT pour mettre à jour l'état
            const addedProduct = {}; // Remplacez ceci par les données réelles
            commit('ADD_PRODUCT', addedProduct);
        },

        updateProduct({ commit }, updatedProduct) {
            // Ici, vous pouvez appeler votre API ou votre base de données pour mettre à jour un produit existant
            // Une fois le produit mis à jour avec succès, utilisez la mutation UPDATE_PRODUCT pour mettre à jour l'état
            commit('UPDATE_PRODUCT', updatedProduct);
        },

        deleteProduct({ commit }, productId) {
            // Ici, vous pouvez appeler votre API ou votre base de données pour supprimer un produit
            // Une fois le produit supprimé avec succès, utilisez la mutation DELETE_PRODUCT pour mettre à jour l'état
            commit('DELETE_PRODUCT', productId);
        },
    },
});