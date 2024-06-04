<template>
  <div>
    <div class="text-center">
      <v-btn
        color="white"
        class="black--text"
        outlined
        elevation="4"
        @click.stop="dialog = true"
      >
        Add New
      </v-btn>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-toolbar
            class="d-flex justify-center text-h5 justify-center"
            color="#2058B8 "
            dark
          >
            Add New Blackout Date
          </v-toolbar>

          <!-- <v-spacer></v-spacer> -->
          <v-card-text>
            <v-card-text class="text-center"
              >Select two (2) dates for each blackout date. <br />
              For single days, select the day of choice twice.</v-card-text
            >
            <v-form class="px-3">
              <v-select
                v-model="select"
                :items="shipOptions"
                item-text="title"
                item-value="id"
                label="Choose Shipping Option"
              ></v-select>

              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="dates"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dates"
                    label="Date range"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dates" range no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="grey" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="black"
                    class="font-weight-bold"
                    @click="$refs.menu.save(dates)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

              <v-spacer></v-spacer>
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  class="mt-3"
                  outlined
                  color="grey"
                  width="200"
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>

                <v-btn
                  @click="
                    addNewDate(shippingOptions);
                    dialog = false;
                  "
                  class=" mr-1 mt-3 font-weight-bold"
                  color="black"
                  outlined
                  elevation="2"
                  width="200"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      select: "",
      dates: [],
      menu: false,
      dialog: false,
      shippingOptionId: 0,
    };
  },

  methods: {
    addNewDate(shippingOptions) {
      let id = this.select;
      let object = shippingOptions.filter((x) => x.id === this.select);
      let dates = object[0].blackoutDates;
      console.log(id);
      console.log(dates);
      console.log(object);

      let newDates = dates.push({
        fromDate: this.dates[0],
        toDate: this.dates[1],
        repeatedAnnually: false,
      });

      console.log(newDates);
      let data = object[0].blackoutDates;
      console.log(data);
      this.addBlackoutDates(data);
    },

    addBlackoutDates(data) {
      const options = {
        method: "PUT",
        url: `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/profile/shippingOptions/${this.select} `,
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
  },

  computed: {
    ...mapGetters(["shippingOptions", "shipOptions"]),
  },
};
</script>
