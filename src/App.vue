<template>
  <v-app>
    <v-app-bar absolute app color="#08215B" dark class="text-h5 ">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <p class="mt-4">{{ title }} Store Manager</p>

      <!-- <template v-slot:extension>
        <v-tabs fixed-tabs>
          
          <v-tab to="/products">Products</v-tab>
          <v-tab to="/categories">Categories</v-tab>
          <v-tab to="/orders">Orders</v-tab>
          <v-tab to="/control">Settings</v-tab>
        </v-tabs>
      </template> -->
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      app
      transition="scroll-x-transition"
    >
      <v-list-item>
        <v-list-item-title class="text-body-1 font-weight-medium"
          >Management Menu
        </v-list-item-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-item>
      <!-- <v-spacer></v-spacer> -->

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group active-class="dark--text text--accent-2">
          <v-list-item>
            <v-icon>mdi-folder</v-icon>

            <v-list-item-title
              ><router-link
                to="/categories"
                class="v-btn v-btn--router v-btn--text v-size--default  "
                >Categories
              </router-link></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-icon>mdi-group</v-icon>
            <v-list-item-title
              ><router-link
                to="/products"
                class="v-btn v-btn--router v-btn--text v-size--default  "
                >Products
              </router-link></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-icon>mdi-cart</v-icon>
            <v-list-item-title
              ><router-link
                to="/orders"
                class="v-btn v-btn--router v-btn--text v-size--default  "
                >Orders
              </router-link></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-icon>mdi-cog</v-icon>
            <v-list-item-title
              ><router-link
                to="/control"
                class="v-btn v-btn--router v-btn--text v-size--default  "
                >Settings
              </router-link></v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template #append>
        <div class="pa-2" style="border-top: grey thin solid;">
          <v-col class="text-center " cols="12">
            <p class="caption ">
              Powered by <br />
              EyeLook Media Inc © {{ new Date().getFullYear() }}
            </p>
            <v-img
              :src="require('./assets/elmFav.png')"
              class="my-3 "
              contain
              height="25"
            />
            <p class="caption mb-0">
              For Technical Support <br />
              Call: 519.913.3169 ext. 208 <br />
              or Email: support@eyelookmedia.com
            </p>
          </v-col>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  History,
  data: () => ({
    title: process.env.VUE_APP_STORE_NAME,
    drawer: false,
    mini: true,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  mounted() {
    console.log(process.env.VUE_APP_STORE_NAME);
  },
  methods: {
    checkOrders() {
      this.polling = setInterval(() => {
        this.$store.dispatch("getOrders").then((res) => {
          console.log(res);
          console.log(this.allOrderUnfullfilled.length);
          if (this.allOrderUnfullfilled.length > 0 && this.newOrder) {
            let alert = document.querySelector("#alertPlay");
            if (alert != null) {
              alert.play();
            }
          } else {
            let alert = document.querySelector("#alertPlay");
            if (alert != null) {
              alert.pause();
            }
          }
        });
      }, 60000);
    },
  },
};
</script>
