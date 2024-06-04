<template>
  <!-- <div class="home"> -->
  <v-card>
    <v-card-text class="pt-5 black--text" style="font-weight: bolder">
      <div v-if="localOrder">
        <div class="large-label  mb-2">{{ title }}</div>
        <v-divider class="mb-5 mt-5  "></v-divider>
        <!-- ORDER HEADER -->
        <div>
          <div class="text-h5 font-weight-black">
            Order #: {{ localOrder.id }}
          </div>
          <div class="text-h6 ">
            {{ localOrder.shippingPerson.name }}
          </div>
          <v-list-item-title class="body-1"
            >Phone:
            <span class="font-weight-bold text-uppercase">{{
              formatPhoneNumber(localOrder.shippingPerson.phone)
            }}</span>
          </v-list-item-title>
          <v-list-item-title class="body-1"
            >Ordered On:
            <span class="font-weight-bold text-uppercase">{{
              formatJustDate(localOrder.createDate)
            }}</span>
          </v-list-item-title>
          <div class="text-body-1">
            <div v-if="localOrder.fulfillmentStatus == 'AWAITING_PROCESSING'">
              Status:
              <span class="font-weight-bold text-uppercase"
                >Order Received</span
              >
            </div>
            <div v-if="localOrder.fulfillmentStatus == 'PROCESSING'">
              Status:
              <span class="font-weight-bold text-uppercase">Processing</span>
            </div>
            <div v-if="localOrder.fulfillmentStatus == 'READY_FOR_PICKUP'">
              Status:
              <span class="font-weight-bold text-uppercase"
                >Ready for Pick-Up</span
              >
            </div>
            <div v-if="localOrder.fulfillmentStatus == 'SHIPPED'">
              Status:
              <span class="font-weight-bold text-uppercase">Order Shipped</span>
            </div>
            <div>
              Order Type:
              <span class="font-weight-bold text-uppercase">
                {{
                  localOrder.shippingOption.fulfillmentType == "PICKUP"
                    ? `Pick-Up`
                    : `Delivery`
                }}</span
              >
            </div>
            <div v-if="localOrder.shippingOption.fulfillmentType == 'DELIVERY'">
              DELIVERY DATE/TIME: {{ processDeliveryDateTime() }}
            </div>
            <div
              v-if="
                localOrder.paymentStatus == 'AWAITING_PAYMENT' &&
                  localOrder.shippingOption.fulfillmentType == 'PICKUP'
              "
            >
              Payment Status:
              <span class="font-weight-bold text-uppercase"
                >PAYMENT REQUIRED</span
              >
            </div>
            <div>
              Order Comments:
              <span class="font-weight-bold">{{
                localOrder.orderComments
                  ? localOrder.orderComments
                  : `No Comments`
              }}</span>
            </div>
          </div>
        </div>
        <v-divider class="mb-5 mt-5  "></v-divider>

        <!-- SHIPPING DETAILS -->
        <div>
          <v-list-item-title class="text-h6"
            >SHIPPING INFORMATION</v-list-item-title
          >
          <!-- <div v-if="localOrder.shippingOption.fulfillmentType == 'DELIVERY'"> -->
          <div>
            <div class="body-1">
              {{ localOrder.shippingPerson.name }}
            </div>
            <div>{{ localOrder.shippingPerson.street }}</div>
            <div>{{ localOrder.shippingPerson.city }}</div>
            <div>{{ localOrder.shippingPerson.postalCode }}</div>
          </div>
          <!-- <div v-else class="text-body-1">N/A</div> -->
        </div>

        <!-- ORDER DETAILS -->
        <v-divider class="mb-5 mt-5  "></v-divider>

        <div class="text-h5 font-weight-black mb-4">
          Order Details
        </div>

        <v-divider class="mt-5 mb-5 "></v-divider>
        <v-col wrap>
          <div
            class="mt-2 "
            v-for="(item, x) in localOrder.items"
            :key="item.id"
          >
            <!-- <v-divider class="mb-5 mt-5  "></v-divider> -->
            <v-card>
              <div class="text-body-1 font-weight-bold ml-4">
                {{ x + 1 }}: {{ item.name }}
              </div>
              <v-toolbar dense>
                <div class="text-body-2 mr-2 ">
                  Price: ${{ item.price * item.quantity }}
                </div>

                <div class="text-body-2 mr-2">QTY: {{ item.quantity }}</div>
                <v-spacer></v-spacer>
                <div
                  class="text-body-2 ml-6"
                  v-for="(option, index) in item.selectedOptions"
                  :key="index"
                  style="font-size:18pt;"
                >
                  <div
                    v-if="
                      option.type === 'CHOICES' &&
                        option.valuesArray.length != 0
                    "
                  >
                    <div class="font-weight-medium">
                      {{ formatOptionName(option.name) }}:
                    </div>
                    <div v-for="(choice, j) in option.valuesArray" :key="j">
                      {{ choice }}
                    </div>
                  </div>

                  <div
                    v-if="
                      option.type === 'CHOICE' && option.valuesArray.length != 0
                    "
                  >
                    <div class="font-weight-medium">
                      {{ formatOptionName(option.name) }}:
                    </div>
                    <div>
                      {{ processOptionName(option.name, option.value) }}
                    </div>
                  </div>

                  <div v-if="option.type === 'TEXT' && option.value !== ''">
                    <div class="font-weight-medium">
                      {{ formatOptionName(option.name) }}:
                    </div>
                    <div>
                      {{ processOptionName(option.name, option.value) }}
                    </div>
                  </div>
                </div>
              </v-toolbar>
            </v-card>
          </div>
        </v-col>
        <!-- AMOUNT DUE TABLE -->

        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr class="text-caption">
                <th class="text-left">
                  Total Items
                </th>
                <th class="text-left">
                  Tax
                </th>
                <th class="text-left">
                  Delivery Fee
                </th>
                <th class="text-left">
                  Order Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-caption">
                <td>{{ getTotalItems() }}</td>
                <td>${{ localOrder.tax.toFixed(2) }}</td>
                <td>
                  ${{ localOrder.shippingOption.shippingRate.toFixed(2) }}
                </td>
                <td>${{ localOrder.total.toFixed(2) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-card-text>
    <v-card-actions>
      <div class="noPrint">
        <v-btn
          elevation="1"
          outlined
          small
          color="#008037"
          class="mr-2"
          @click="printOrder()"
          >Print</v-btn
        >
        <v-btn
          elevation="1"
          outlined
          small
          color="#ED1F24"
          class="mr-2"
          to="/orders"
          >Close</v-btn
        >
      </div>
    </v-card-actions>
  </v-card>
  <!-- <div class="page-break" /></div> -->
  <!-- </div> -->
</template>

<script>
// @ is an alias to /src

import moment from "moment";
export default {
  name: "Orders",
  components: {},
  data() {
    return {
      localOrder: null,
      printDialogShow: false,
      title: process.env.VUE_APP_STORE_NAME,
    };
  },
  mounted: function () {
    // let alert = document.querySelector("#alertPlay");
    // if (alert != null) {
    //   alert.pause();
    // }
    let cID = this.$route.params.id;
    this.localOrder = this.$store.getters.getOrderById(cID);
    console.log(this.localOrder);
  },
  methods: {
    processDeliveryDateTime() {
      let returnValue = "";
      returnValue =
        this.formatJustDate(
          this.localOrder.extraFields.ecwid_order_delivery_time_interval_start
        ) +
        " " +
        this.formatJustTime(
          this.localOrder.extraFields.ecwid_order_delivery_time_interval_start
        );
      return returnValue;
    },
    // calcTip(amount, total) {
    //   //0%, 10%, 15%, 18%, 25%
    //   let returnValue = 0;
    //   console.log(amount, total);
    //   switch (amount) {
    //     case "0%":
    //       returnValue = 0;
    //       break;
    //     case "10%":
    //       returnValue = total * 0.1;
    //       break;
    //     case "15%":
    //       returnValue = total * 0.15;
    //       break;
    //     case "18%":
    //       returnValue = total * 0.18;
    //       break;
    //     case "25%":
    //       returnValue = total * 0.25;
    //       break;
    //   }

    //   return returnValue.toFixed(2);
    // },
    getTotalItems() {
      let returnCount = 0;

      this.localOrder.items.forEach((x) => {
        returnCount += x.quantity;
      });
      return returnCount;
    },
    processOptionName(optionName, optionValue) {
      let returnName = "";

      switch (optionName) {
        case "Choose Your Paint Sheen":
          returnName = optionValue;
          break;
        case "Choose Your Paint Colour":
          returnName = optionValue;
          break;
        case "Have another paint colour in mind? Enter your colour choice here.":
          returnName = optionValue;
          break;
        case "Pick Your Colour":
          returnName = optionValue;
          break;
        case "Size":
          returnName = optionValue;
          break;

        default:
          returnName = optionValue;
          break;
      }

      return returnName;
    },

    formatOptionName(option) {
      console.log(option);
      let returnValue = "";
      switch (option) {
        case "Choose Your Paint Line":
          returnValue = "Line";
          break;
        case "Choose Your Paint Sheen":
          returnValue = "Sheen";
          break;
        case "Choose Your Paint Colour":
          returnValue = "Colour";
          break;
        case "Choose Your Colour":
          returnValue = "Colour";
          break;
        case "Have another paint colour in mind? Enter your colour choice here.":
          returnValue = "Alt Colour Choice";
          break;
        case "Size":
          returnValue = "Size";
          break;
        default:
          returnValue = option;
          break;
      }

      return returnValue;
    },
    printOrder() {
      //   this.printDialogShow = true;

      window.print();
    },
    // formatPickupTime(dateToFormat) {
    //   console.log(dateToFormat);
    //   return moment(dateToFormat).format("MM-DD hh:mm A");
    // },
    formatJustTime(dateToFormat) {
      console.log(dateToFormat);
      return moment(dateToFormat).format("hh:mm A");
    },
    formatJustDate(dateToFormat) {
      console.log(dateToFormat);
      return moment(dateToFormat).format("MM-DD");
    },

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
.receipt-label {
  font-size: 10pt;
  font-weight: bolder;
}

.large-label {
  font-size: 16pt;
}
.page-break {
  page-break-inside: always;
}

@media print {
  .noPrint {
    display: none;
  }
}
</style>
