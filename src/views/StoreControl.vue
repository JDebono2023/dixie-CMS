<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <v-container class="mb-2 fluid">
      <v-card class="mt-6">
        <OpenClose />
      </v-card>
    </v-container>
    <v-container class="mb-2 fluid">
      <v-card >
        <v-toolbar dark color="#153E9D" class="mb-0">
          <v-toolbar-title class="mr-16 pr-16"
            >Blackout Dates ~ Delivery & Pick-Up Options</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <!-- <v-card-actions> <Popup /></v-card-actions> -->
        </v-toolbar>
        <v-toolbar dark color="#2058B8" class="mb-0">
          <v-icon class="mr-1">mdi-plus</v-icon>
          <p class="text-body1 mb-0"
            >Add New Blackout Date</p
          >
          <v-spacer></v-spacer>
          <v-card-actions> <Popup /></v-card-actions>
        </v-toolbar>

        <v-row wrap class="mt-4">
          <v-card
            class="mx-auto mb-5 px-4"
            d-sm-flex
            width="400"
            outlined
            
            elevation="2"
            v-for="(ship, index) in shippingOptions.filter(
              x => x.enabled === true
            )"
            :key="index"
            :id="ship.id"
          >
            <v-card-title
              class="font-weight-bold d-flex flex-wrap text-subtitle-1"
            >
              {{ ship.title }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-list dense>
                <v-list-item-title class="font-weight-medium text-subtitle-2"
                  >Existing Blackout Dates:</v-list-item-title
                >
                <v-list-item-group color="primary">
                  <v-list-item
                    v-for="(date, index) in ship.blackoutDates"
                    :key="index"
                  >
                    <v-list-item-content>
                      <v-list-item-title :id="index" class="text-subtitle-2"
                        >{{ date.fromDate }} to
                        {{ date.toDate }}</v-list-item-title
                      >
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-btn
                        icon
                        color="black"
                        @click.stop="
                          deleteDate(index, ship.id, shippingOptions);
                          dialog = true;
                        "
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <!-- <ul>
                  <li :id="index">
                    {{ date.fromDate }} to {{ date.toDate
                    }}<span
                      ><v-btn
                        icon
                        color="black"
                        @click.stop="
                          deleteDate(index, ship.id, shippingOptions);
                          dialog = true;
                        "
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn></span
                    >
                  </li>
                </ul> -->
              <!-- </div> -->
            </v-card-text>
          </v-card>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
import { mapGetters } from "vuex";

import Popup from "../components/Popup.vue";
import OpenClose from "../components/openclose.vue";
export default {
  name: "Control",
  components: { Popup, OpenClose },
  data() {
    return {
      select: "",
      shippingOptionId: 0,
    };
  },

  mounted() {
    this.$store.dispatch("getShippingOptions");
  },

  methods: {
    deleteDate(dateId, shipId, shippingOptions) {
      let object = shippingOptions.filter((x) => x.id === shipId);
      let dates = object[0].blackoutDates;

      console.log(dateId);

      dates.splice(dateId, 1);
      console.log(dates);

      this.deleteBlackoutDates(dates, shipId);
    },
    deleteBlackoutDates(data, shipId) {
      const options = {
        method: "PUT",
        url: `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/profile/shippingOptions/${shipId} `,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
        },
        data: {
          blackoutDates: data,
        },
      };
      console.log(data);
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "sm":
          return 600;
        case "md":
          return 600;
        case "lg":
          return 800;
        case "xl":
          return 800;
      }
    },
  },
  computed: {
    ...mapGetters(["shippingOptions"]),
    shipOptions() {
      return this.$store.state.shippingOptions;
    },
  },
};
</script>

<style></style>
