<template>
  <v-container fluid>
    <!-- NEW ORDERS TABLE -->
    <template>
      <v-banner color="#2058B8" dark single-line class=" text-center "
        >NEW ORDERS</v-banner
      >
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <!-- <tr color="#2058B8">
              NEW ORDERS
            </tr> -->
            <tr>
              <th class="text-left">
                ORDER ID
              </th>
              <th class="text-left">
                DATE
              </th>
              <th class="text-left">
                CUSTOMER
              </th>
              <th class="text-left">
                PHONE
              </th>
              <th class="text-left">
                ORDER TYPE
              </th>
              <th class="text-left">
                DELIVERY DATE/TIME
              </th>
              <th class="text-left">
                VIEW ORDER
              </th>
            </tr>
          </thead>
          <tbody v-if="allOrderUnfullfilled.length !== 0">
            <tr v-for="order in allOrderUnfullfilled" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ formatJustDate(order.createDate) }}</td>
              <td>
                {{ order.shippingPerson.name }}
              </td>
              <td>
                {{ formatPhoneNumber(order.shippingPerson.phone) }}
              </td>
              <td>
                {{
                  order.shippingOption.fulfillmentType == "PICKUP"
                    ? `Pick-Up`
                    : `Delivery`
                }}
              </td>
              <td>
                {{
                  order.shippingOption.fulfillmentType == "DELIVERY"
                    ? processDeliveryDateTime(order)
                    : ""
                }}
              </td>
              <td>
                <v-btn icon :to="'order/' + order.id">
                  <v-icon>mdi-arrow-right-bold-box</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
          <body v-else>
            <td class="pl-4">
              No Orders In Process
            </td>
          </body>
        </template>
      </v-simple-table>
    </template>
    <div class="my-6"></div>

    <!-- PROCESSING ORDERS TABLE -->
    <template>
      <v-banner color="#2058B8" dark single-line class=" text-center "
        >PROCESSING</v-banner
      >
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                ORDER ID
              </th>
              <th class="text-left">
                DATE
              </th>
              <th class="text-left">
                CUSTOMER
              </th>
              <th class="text-left">
                PHONE
              </th>
              <th class="text-left">
                ORDER TYPE
              </th>

              <th class="text-left">
                DELIVERY DATE/TIME
              </th>
              <th class="text-left">
                VIEW ORDER
              </th>
              <!-- <th>ORDER READY</th> -->
            </tr>
          </thead>
          <tbody v-if="allOrderProcessed.length !== 0">
            <tr v-for="order in allOrderProcessed" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ formatJustDate(order.createDate) }}</td>
              <td>
                {{ order.shippingPerson.name }}
              </td>
              <td>
                {{ formatPhoneNumber(order.shippingPerson.phone) }}
              </td>
              <td>
                {{
                  order.shippingOption.fulfillmentType == "PICKUP"
                    ? `Pick-Up`
                    : `Delivery`
                }}
              </td>

              <td>
                {{
                  order.shippingOption.fulfillmentType == "DELIVERY"
                    ? processDeliveryDateTime(order)
                    : ""
                }}
              </td>
              <td>
                <v-btn icon :to="'order/' + order.id">
                  <v-icon>mdi-arrow-right-bold-box</v-icon>
                </v-btn>
              </td>
              <!-- <td v-if="order.shippingOption.fulfillmentType == 'PICKUP'">
                <v-btn icon @click="setReadyForPickup()">
                  <v-icon>mdi-share</v-icon>
                </v-btn>
              </td>
              <td v-else>
                <v-btn icon @click="setReadyForDelivery()">
                  <v-icon>mdi-share</v-icon>
                </v-btn>
              </td> -->
            </tr>
          </tbody>
          <body v-else>
            <td class="pl-4">
              No Orders In Process
            </td>
          </body>
        </template>
      </v-simple-table>
    </template>
    <div class="my-6"></div>

    <!-- COMPLETE ORDERS TABLE -->
    <template>
      <v-banner color="#2058B8" dark single-line class=" text-center "
        >COMPLETE
      </v-banner>
      <!-- PICK-UP ORDERS TABLE -->
      <div class="mt-4"></div>
      <banner color="#2058B8" dark single-line class=" text-center "
        >READY FOR PICK-UP</banner
      >
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                ORDER ID
              </th>
              <th class="text-left">
                DATE
              </th>
              <th class="text-left">
                CUSTOMER
              </th>
              <th class="text-left">
                PHONE
              </th>
              <!-- <th class="text-left">
                READY FOR PICK-UP
              </th> -->
              <th class="text-left">
                MARK PAID
              </th>
            </tr>
          </thead>

          <tbody v-if="allReadyForPickup.length !== 0">
            <tr v-for="order in allReadyForPickup" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ formatJustDate(order.createDate) }}</td>
              <td>
                {{ order.shippingPerson.name }}
              </td>
              <td>
                {{ formatPhoneNumber(order.shippingPerson.phone) }}
              </td>

              <td>
                <v-btn icon @click="setOrderPaid(order)">
                  <v-icon>mdi-currency-usd</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <!-- DELIVERY ORDERS TABLE -->
      <div class="mt-4"></div>
      <banner color="#2058B8" dark single-line class=" text-center "
        >READY FOR SHIPPING</banner
      >
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                ORDER ID
              </th>
              <th class="text-left">
                DATE
              </th>
              <th class="text-left">
                CUSTOMER
              </th>
              <th class="text-left">
                PHONE
              </th>

              <th class="text-left">
                DELIVERY DATE/TIME
              </th>
              <th class="text-left">
                MARK SHIPPED
              </th>
            </tr>
          </thead>
          <tbody v-if="allReadyForShipping.length !== 0">
            <tr v-for="order in allReadyForShipping" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ formatJustDate(order.createDate) }}</td>
              <td>
                {{ order.shippingPerson.name }}
              </td>
              <td>
                {{ formatPhoneNumber(order.shippingPerson.phone) }}
              </td>

              <td>
                {{
                  order.shippingOption.fulfillmentType == "DELIVERY"
                    ? processDeliveryDateTime(order)
                    : ""
                }}
              </td>
              <td>
                <v-btn icon value="delivery" @click="setOrderPaid(order)">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
          <!-- <body v-else>
            <td class="pl-4">
              No Orders In Process
            </td>
          </body> -->
        </template>
      </v-simple-table>
    </template>
  </v-container>
</template>

<script>
// @ is an alias to /src

import { mapGetters } from "vuex";

import moment from "moment";

export default {
  name: "Orders",
  components: {},
  data: () => ({
    hidden: false,
  }),
  computed: {
    ...mapGetters([
      "allOrders",
      "allOrderUnfullfilled",
      "allOrderProcessed",
      "allReadyForPickup",
      "allReadyForShipping",
      "newOrder",
    ]),
  },

  mounted() {
    this.$store.dispatch("getOrders").then((res) => {
      console.log(res);
      console.log(this.allOrderUnfullfilled.length);
      if (this.allOrderUnfullfilled.length > 0 && this.newOrder) {
        let alert = document.querySelector("#alertPlay");
        if (alert != null) alert.play();
      }
    });
  },
  updated() {},
  methods: {
    processDeliveryDateTime(order) {
      let returnValue = "";
      returnValue =
        this.formatJustDate(
          order.extraFields.ecwid_order_delivery_time_interval_start
        ) +
        " " +
        this.formatJustTime(
          order.extraFields.ecwid_order_delivery_time_interval_start
        );
      return returnValue;
    },
    formatJustTime(dateToFormat) {
      console.log(dateToFormat);
      return moment(dateToFormat).format("hh:mm A");
    },
    formatJustDate(dateToFormat) {
      console.log(dateToFormat);
      return moment(dateToFormat).format("MM-DD");
    },
    formatPickupTime(dateToFormat) {
      return moment(dateToFormat).format("MM-DD hh:mm A");
    },
    setOrderPaid(order) {
      this.$store.dispatch("markOrderPaid", order);
      this.$store.dispatch("getOrders");
    },
    // setReadyForPickup() {
    //   this.$store.dispatch("markOrderReadyForPickup", this.localOrder);
    //   // this.$router.push("/orders");
    // },
    // setReadyForDelivery() {
    //   this.$store.dispatch("markOrderShipped", this.localOrder);
    //   // this.$router.push("/orders");
    // },
    formatPhoneNumber(phone) {
      let cleaned = ("" + phone).replace("+1", "");
      let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        //Remove the matched extension code
        //Change this to format for any country code.
        let intlCode = match[1] ? "+1 " : "";
        return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
          ""
        );
      }

      return null;
    },
  },
};
</script>

<style>
.AWAITING_PROCESSING {
  background-color: green;
}
</style>
