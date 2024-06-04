<template>
  <div class="home">
    <v-container>
      <div v-if="localOrder">
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
          </div>
          <v-list-item-title>
            Order Type:
            <span class="font-weight-bold text-uppercase">
              {{
                localOrder.shippingOption.fulfillmentType == "PICKUP"
                  ? `Pick-Up`
                  : `Delivery`
              }}</span
            ></v-list-item-title
          >
          <div
            class="text-h6"
            v-if="localOrder.shippingOption.fulfillmentType == 'DELIVERY'"
          >
            DELIVERY DATE/TIME: {{ processDeliveryDateTime() }}
          </div>
          <!-- <div
          class="text-h4"
          v-if="localOrder.shippingOption.fulfillmentType !== 'DELIVERY'"
        >
          PICKUP TIME: {{ formatPickupTime(localOrder.pickupTime) }}
        </div> -->
        </div>
        <v-divider class="mb-5 mt-5  "></v-divider>

        <!-- ORDER DETAILS -->
        <div>
          <div class="text-h5 font-weight-black">
            Order Details
          </div>
          <div class="text-h6">
            Order Total:
            <span class="font-weight-regular">${{ localOrder.total }}</span>
          </div>
          <div class="text-h6 ">
            Item Count:
            <span class="font-weight-regular">{{ getTotalItems() }}</span>
          </div>

          <div class="text-h6 ">
            Order Comments: <br />
            <span class="text-body-1 font-weight-regular">{{
              localOrder.orderComments
                ? localOrder.orderComments
                : `No Comments`
            }}</span>
          </div>
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

        <!-- PRODUCT TABLE -->
        <!-- <v-simple-table
          dense
          v-for="(option, index) in localOrder.items"
          :key="index"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  ITEM
                </th>
                <th class="text-left">
                  QTY
                </th>
                <th class="text-left">
                  PRICE
                </th>
                <th class="text-left">
                  PRODUCT
                </th>
                <th class="text-left">
                  LINE
                </th>
                <th class="text-left">
                  FINISH
                </th>
                <th class="text-left">
                  COLOUR
                </th>
                <th class="text-left">
                  ALT COLOUR CHOICE
                </th>
                <th class="text-left">
                  STAIN COLOUR
                </th>
                <th class="text-left">
                  SIZE
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, x) in localOrder.items" :key="item.id">
                <td>{{ x + 1 }}</td>

                <td>{{ item.quantity }}</td>
                <td>${{ item.price * item.quantity }}</td>
                <td>{{ item.name }}</td>
                <td v-for="(option, j) in option.selectedOptions" :key="j">
                  {{ processOptionName(option.name, option.value) }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-divider class="mt-4 mb-1 "></v-divider> -->
      </div>
    </v-container>

    <!-- FOOTER -->
    <div class="overflow-hidden ">
      <v-bottom-navigation app dark>
        <v-btn value="recent" to="/orders">
          <span>Go Back</span>
          <v-icon large>mdi-arrow-left-circle</v-icon>
        </v-btn>
        <v-btn value="pickup" :to="'/OrderPrint/' + this.$route.params.id">
          <span>Print Preview</span>

          <v-icon large color="white" dark>mdi-printer</v-icon>
        </v-btn>
        <v-btn
          value="processing"
          @click="setProcessing()"
          v-if="localOrder && localOrder.fulfillmentStatus !== 'PROCESSING'"
        >
          <span>Set to Processing</span>

          <v-icon large color="orange lighten-3" dark>mdi-share</v-icon>
        </v-btn>

        <v-btn
          value="pickup"
          @click="setReadyForPickup()"
          v-if="
            localOrder.shippingOption.fulfillmentType == 'PICKUP' &&
              localOrder &&
              localOrder.fulfillmentStatus == 'PROCESSING'
          "
        >
          <span>Ready For Pickup</span>

          <v-icon large color="green" dark>mdi-check</v-icon>
        </v-btn>
        <v-btn
          value="delivery"
          @click="setReadyForDelivery()"
          v-if="
            localOrder.shippingOption.fulfillmentType == 'DELIVERY' &&
              localOrder.fulfillmentStatus == 'PROCESSING'
          "
        >
          <span>Ready For Delivery</span>

          <v-icon large color="green" dark>mdi-check</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import moment from "moment";
export default {
  name: "Order",
  components: {},
  data() {
    return {
      localOrder: null,
    };
  },
  mounted: function () {
    let alert = document.querySelector("#alertPlay");
    if (alert != null) {
      alert.pause();
    }
    let cID = this.$route.params.id;
    this.localOrder = this.$store.getters.getOrderById(cID);
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
    getTotalItems() {
      let returnCount = 0;

      this.localOrder.items.forEach((x) => {
        returnCount += x.quantity;
      });
      return returnCount;
    },
    printOrder() {
      //   this.printDialogShow = true;

      window.print();
    },
    formatPickupTime(dateToFormat) {
      console.log(dateToFormat);
      return moment(dateToFormat).format("MM-DD hh:mm A");
    },
    formatJustTime(dateToFormat) {
      console.log(dateToFormat);
      return moment(dateToFormat).format("hh:mm A");
    },
    formatJustDate(dateToFormat) {
      console.log(dateToFormat);
      return moment(dateToFormat).format("MM-DD");
    },

    setReadyForPickup() {
      this.$store.dispatch("markOrderReadyForPickup", this.localOrder);
      this.$router.push("/orders");
    },
    setReadyForDelivery() {
      this.$store.dispatch("markOrderShipped", this.localOrder);
      this.$router.push("/orders");
    },
    setProcessing() {
      this.$store.dispatch("markOrderProcessing", this.localOrder);

      this.$router.push("/orders");
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
        case "Pick Your Colour":
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
  },
};
</script>

<style>
.receipt-label {
  font-size: 16pt;
  font-weight: bolder;
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
