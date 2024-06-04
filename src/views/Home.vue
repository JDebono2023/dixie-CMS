<template>
  <v-container class="mt-0" fluid>
    <v-card
      elevation="4"
      class="py-0 rounded-lg rounded-b-0"
      outlined
      color="#153E9D"
      dark
    >
      <p class="text-h6 py-2 px-4 mb-0 ">
        Products By Active Category
      </p></v-card
    >

    <v-card class="mb-6 "
      ><v-toolbar dark color="#2058B8" elevation="2" tile dense>
        <template dense>
          <v-tabs
            align-with-title
            fixed-tabs
            right
            next-icon="mdi-arrow-right-bold-box-outline"
            prev-icon="mdi-arrow-left-bold-box-outline"
            show-arrows
          >
            <!-- <v-tabs-slider color="grey lighten-3"></v-tabs-slider> -->

            <v-tab
              v-for="(category, index) in activeCategories"
              :key="index"
              small
              elevation="2"
              @click="loadProducts(category.id)"
              >{{ category.name }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-row wrap class="mt-6">
        <v-card
          class="mx-auto mb-5"
          width="300"
          outlined
          color="light-grey"
          elevation="2"
          v-for="(product, index) in sortedProducts.filter(
            x => x.enabled === true
          )"
          :key="index"
        >
          <v-list-item three-line class="py-0">
            <v-list-item-content class="py-0">
              <div class="text-overline ">ITEM IS LIVE</div>
              <v-list-item-title
                class="text-subtitle2 font-weight-bold text-wrap"
              >
                {{ product.name }}
              </v-list-item-title>
              <v-list-item-content class="text-body-2 text-wrap py-0">
                Current Price: ${{ product.price }}
              </v-list-item-content>
            </v-list-item-content>

            <v-list-item-avatar tile size="100">
              <v-img class="mt-2" :src="product.smallThumbnailUrl" contain />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions class="ml-2">
            <v-btn
              elevation="1"
              outlined
              small
              color="#ED1F24"
              @click="disableProduct(product)"
              v-if="product.enabled"
              >Disable</v-btn
            >
          </v-card-actions>
        </v-card>

        <v-card
          class="mx-auto mb-5"
          width="300"
          outlined
          color="light-grey"
          elevation="2"
          v-for="(product, index) in sortedProducts.filter(
            x => x.enabled === false
          )"
          :key="'dis' + index"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-subtitle2 font-weight-light mb-1">
                {{ product.name }}
              </div>
              <div class="text-subtitle2 font-weight-light mb-1">
                Current Price: ${{ product.price }}
              </div>
            </v-list-item-content>

            <v-list-item-avatar tile size="100">
              <v-img class="mt-2" :src="product.smallThumbnailUrl" contain />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions class="ml-2">
            <v-btn
              color="#008037"
              elevation="1"
              outlined
              small
              @click="enableProduct(product)"
              v-if="!product.enabled"
              >Enable</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {},
  data: () => ({
    //
    optionsToClone: [],
    currentCategorieID: 0,
    AllProductRequests: [],
    more: ["item1", "item2"],
  }),
  mounted() {
    this.$store.dispatch("getCategories");
    console.log(this.products);
  },

  methods: {
    enableProduct(product) {
      const API_URL = `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/products/${product.id}?token=${process.env.VUE_APP_TOKEN}`;
      const data = {
        enabled: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      let that = this;
      axios
        .put(API_URL, data)
        .then(function () {
          that.loadProducts(that.currentCategorieID);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    disableProduct(product) {
      const API_URL = `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/products/${product.id}?token=${process.env.VUE_APP_TOKEN}`;
      const data = {
        enabled: false,
        headers: {
          "Content-Type": "application/json",
        },
      };

      let that = this;
      axios
        .put(API_URL, data)
        .then(function () {
          that.loadProducts(that.currentCategorieID);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getItems() {
      this.$store.dispatch("getCategories");
    },
    loadProducts(id) {
      // daily specials
      console.log(id);
      this.currentCategorieID = id;
      this.$store.dispatch("getProducts", id);
    },
  },
  computed: {
    ...mapGetters(["activeCategories", "products", "sortedProducts"]),
    // sortedProducts() {
    //   let products = this.products;

    //   let sortedProducts = products.sort((a, b) => {
    //     let fa = a.name.toLowerCase(),
    //       fb = b.name.toLowerCase();
    //     if (fa < fb) {
    //       return -1;
    //     }
    //     if (fa > fb) {
    //       return 1;
    //     }
    //     return 0;
    //   });
    //   return sortedProducts;
    // },
  },
};
</script>
