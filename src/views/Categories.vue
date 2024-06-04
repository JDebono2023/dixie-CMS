<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-card
          elevation="4"
          class="py-0 rounded-lg rounded-b-0"
          outlined
          color="#153E9D"
          dark
        >
          <p class="text-h6 py-2 pl-4 mb-0 ">
            Categories
          </p></v-card
        >

        <v-row class="d-flex justify-center flex-wrap align-content-start mt-4">
          <v-card
            class="mx-2 my-4"
            width="250"
            outlined
            color="light-grey"
            elevation="2"
            v-for="(category, index) in sortedCategories.filter(
              x => x.enabled === true
            )"
            :key="index"
          >
            <v-card>
              <v-img
                :src="category.thumbnailUrl"
                class="white--text align-end grey lighten-2"
                gradient="to bottom, rgba(132, 138, 144, 0.21), rgba(25,32,72,.7)"
                height="175px"
                opacity="0.5"
              >
                <v-card-title v-text="category.name"></v-card-title>
              </v-img>
              <!-- <v-card-text class="text-overline">ACTIVE</v-card-text> -->
              <v-card-actions>
                <v-card-text class="text-overline">ACTIVE</v-card-text>
                <v-spacer></v-spacer>

                <v-btn
                  elevation="1"
                  outlined
                  small
                  color="#ED1F24"
                  @click="disableCat(category.id)"
                  v-if="category.enabled"
                  >Disable</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-card>
          <v-card
            class="mx-2 my-4"
            width="250"
            outlined
            color="grey lighten-2"
            elevation="2"
            v-for="(category, index) in sortedCategories.filter(
              x => x.enabled === false
            )"
            :key="index"
          >
            <v-card>
              <v-img
                :src="category.thumbnailUrl"
                class="white--text align-end grey lighten-2"
                gradient="to bottom, rgba(132, 138, 144, 0.21), rgba(25,32,72,.7)"
                height="175px"
                opacity="0.5"
              >
                <v-card-title v-text="category.name"></v-card-title>
              </v-img>
              <!-- <v-card-text class="text-overline">ACTIVE</v-card-text> -->
              <v-card-actions>
                <v-card-text class="text-overline">INACTIVE</v-card-text>
                <v-spacer></v-spacer>

                <v-btn
                  elevation="1"
                  outlined
                  small
                  color="#008037"
                  @click="enableCat(category.id)"
                  v-if="!category.enabled"
                  >Enable</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-card>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "categories",

  methods: {
    enableCat(id) {
      const API_URL = `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/categories/${id}?token=${process.env.VUE_APP_TOKEN}`;
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
          that.updateCategory();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    disableCat(id) {
      const API_URL = `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/categories/${id}?token=${process.env.VUE_APP_TOKEN}`;
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
          that.updateCategory();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    updateCategory() {
      this.$store.dispatch("getCategories");
    },
  },
  mounted() {
    this.$store.dispatch("getCategories");
  },
  computed: {
    ...mapGetters(["categories"]),
    sortedCategories() {
      let sortedCategories = this.categories;

      sortedCategories = sortedCategories.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      return sortedCategories;
    },
  },
};
</script>
