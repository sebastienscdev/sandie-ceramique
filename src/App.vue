<template>
    <v-app>
        <!-- App Bar with Logo, Title, and Toggle Button -->
        <v-app-bar color="#c6eadc" app>
            <!-- Logo -->
            <v-img src="@/assets/images/spezzatti.svg" max-height="50" max-width="50" contain @click.stop="goToHomePage"></v-img>

            <v-spacer></v-spacer> <!-- Spacer to push the toggle button to the right -->

            <!-- Title -->
            <v-toolbar-title> {{currentRouteText }}</v-toolbar-title>

            <v-spacer></v-spacer> <!-- Spacer to push the toggle button to the right -->

            <!-- Toggle Button -->
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <!-- Basket Icon (conditionally rendered) -->
            <!-- Basket Icon with Badge (conditional) -->
            <template v-if="itemCountInCart > 0">
                <v-badge overlap>
                    <template v-slot:badge>
                        <span class="white--text">{{ itemCountInCart }}</span>
                    </template>
                    <v-icon>mdi-cart</v-icon>
                </v-badge>
            </template>

        </v-app-bar>

        <!-- Navigation Drawer -->
        <v-navigation-drawer app v-model="drawer">
            <v-list>
                <v-list-item v-for="(link, index) in navigationLinks" :key="index">
                    <router-link :to="link.route">{{ link.text }}</router-link>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- Main Content -->
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'AppLayout',
    data() {
        return {
            drawer: false, // Initialize drawer state to closed
            navigationLinks: [{
                    text: 'Bienvenue',
                    route: '/'
                },
                {
                    text: 'Mes créations',
                    route: '/about'
                },
                {
                    text: 'Contactez-moi',
                    route: '/contact'
                },
                {
                    text: 'Votre panier',
                    route: '/Basket'
                },
                {
                    text: 'Connexion',
                    route: '/adminlogin',
                },
                // Add more links as needed
            ],
        };
    },

    computed: {
        itemCountInCart() {
            // Calculate the total number of items in the cart
            return this.$store.state.cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
        },
        currentRouteText() {
            // Get the current route path
            const currentRoute = this.$route.path;

            // Find the matching navigation link based on the route
            const matchingLink = this.navigationLinks.find(link => link.route === currentRoute);

            // Return the text of the matching link, or a default value
            return matchingLink ? matchingLink.text : '';
        },
    },

    methods: {
        goToHomePage() {
            this.$router.push('/');
        }
    },
};
</script>

<style lang="scss">
@import "@/assets/custom-variables.scss";

#app {
    font-family: roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: 400;
        color: #2c3e50 !important;
        text-decoration: none;

        &.router-link-active {
            color: #2c3e50;
            text-decoration: none;
            font-weight: 400;
        }

        &.router-link-exact-active {
            color: #c6eadc !important;
            text-decoration: none;
            font-weight: 600;
        }
    }
}
</style>
