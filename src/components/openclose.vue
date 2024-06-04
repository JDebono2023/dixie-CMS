<template>
  <div>
    <v-card color="" flat>
      <v-toolbar dark color="#153E9D">
        <v-toolbar-title> Store Status</v-toolbar-title>
      </v-toolbar>

      <v-banner single-line class="text-h6">
        Your {{ storeStatus ? `Store is Closed` : `Store is Open` }}

        <template v-slot:actions>
          <v-btn
            class="mr-6 px-6 py-4"
            elevation="4"
            dark
            :color="storeStatus ? `#AEBE58` : `#ED1F24`"
            @click="showDialog = true"
            >{{ storeStatus ? `Open Store` : `Close Store` }}</v-btn
          >
        </template>
      </v-banner>
    </v-card>

    <v-dialog v-model="showDialog" persistent width="500" height="500">
      <v-card class=" " height="300">
        <v-toolbar
          class="d-flex justify-center text-h5 justify-center"
          color="#2058B8 "
          dark
          >{{ storeStatus ? `Store is Closed` : `Store is Open` }}</v-toolbar
        >
        <v-card-text
          class="pt-10 d-flex justify-center black--text text-h6 font-weight-regular mt-6"
        >
          Are you sure you want to
          <span class=" ml-1 mr-1 font-weight-bold">{{
            storeStatus ? `OPEN` : `CLOSE`
          }}</span>
          the store?
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions class="d-flex justify-center mt-8">
          <v-btn
            width="200"
            outlined
            color="grey"
            class="text-h6"
            @click="showDialog = false"
            >Cancel</v-btn
          >

          <v-btn
            width="200"
            color="black"
            outlined
            elevation="2"
            class="text-h6"
            @click="
              toggleStatus();
              showDialog = false;
            "
            >Yes</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
//import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CmsOpenclose",
  data() {
    return {
      messageOpen: "Store is open",
      message: "Store is closed",
      openStore: "Enable",
      closeStore: "Disable",
      showDialog: false,
    };
  },
  //call to grab the store status
  mounted() {
    this.$store.dispatch("getStatus");
  },
  //bring in the usuable status info
  computed: {
    ...mapGetters(["storeStatus"]),
  },
  methods: {
    ...mapActions({
      toggleStatus: `toggleStatus`,
    }),
  },
};
</script>
<style scoped>
storeStatus {
  background-color: #aebe58;
}

closeopenText {
  font-size: 20px;
}
</style>
