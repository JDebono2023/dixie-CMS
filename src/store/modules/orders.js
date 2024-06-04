import axios from "axios";

// NOTE state
export const state = {
  orders: [],
  newOrder: false
};

// NOTE mutations
export const mutations = {
  mutSetOrders(state, { items }) {
    console.log(items);
    let orderFlag = false;
    items.every(newOrder => {
      let objIndex = state.orders.findIndex(
        stateOrder => stateOrder.id === newOrder.id
      );
      console.log(objIndex);
      if (objIndex == -1) {
        orderFlag = true;
        return false;
      } else {
        orderFlag = false;
      }
    });
    state.newOrder = orderFlag;
    state.orders = items;
  },
  mutSetProcessingLocal(state, order) {
    // Update the local array
    let objIndex = state.orders.findIndex(obj => obj.id === order.id);
    state.orders[objIndex].fulfillmentStatus = "PROCESSING";
  },
  mutSetReadyForPickup(state, order) {
    // Update the local array
    let objIndex = state.orders.findIndex(obj => obj.id === order.id);
    state.orders[objIndex].fulfillmentStatus = "READY_FOR_PICKUP";
  },
  //mutSetDeliveredLocal
  mutSetDeliveredLocal(state, order) {
    // Update the local array
    let objIndex = state.orders.findIndex(obj => obj.id === order.id);
    state.orders[objIndex].fulfillmentStatus = "DELIVERED";
  },

  mutSetShippedLocal(state, order) {
    // Update the local array
    let objIndex = state.orders.findIndex(obj => obj.id === order.id);
    state.orders[objIndex].fulfillmentStatus = "SHIPPED";
  },
  mutSetNewOrder(state) {
    state.newOrder = !state.newOrder;
  }
};

// NOTE actions this.state.media.mediaLibrary.
export const actions = {
  toggleNewOrder({ commit }) {
    commit("mutSetNewOrder");
  },
  async getOrders({ commit }) {
    return new Promise((resolve, reject) => {
      let dt = new Date();
      dt.setDate(dt.getDate() - 1);
      let dateForFiltre = Math.round(dt.getTime() / 1000);
      const API_URL = `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/orders?token=${process.env.VUE_APP_TOKEN}&createdFrom=${dateForFiltre}`;
      const options = {};
      axios
        .get(API_URL, options)
        .then(function(response) {
          commit("mutSetOrders", response.data);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log(error);
          reject(error);
        });
    });
  },
  async markOrderReadyForPickup({ commit, dispatch }, orderData) {
    console.log(commit);
    console.log(orderData);

    // commit("mutSetReadyForPickup", orderData);

    const API_URL = `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/orders/${orderData.id}?token=${process.env.VUE_APP_TOKEN}`;
    const data = {
      fulfillmentStatus: "READY_FOR_PICKUP"
    };
    axios
      .put(API_URL, data)
      .then(function() {
        dispatch("getOrders");
        //  commit("mutSetOrders", response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  async markOrderProcessing({ commit, dispatch }, orderData) {
    console.log(commit);
    console.log(orderData);
    return new Promise((resolve, reject) => {
      // Update the local array
      // commit("mutSetProcessingLocal", orderData);

      const API_URL = `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/orders/${orderData.id}?token=${process.env.VUE_APP_TOKEN}`;
      const data = {
        fulfillmentStatus: "PROCESSING"
      };
      axios
        .put(API_URL, data)
        .then(function() {
          // commit("mutSetOrders", response.data);
          dispatch("getOrders")
            .then(res => {
              resolve(res);
            })
            .error(err => {
              reject(err);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  },
  async markOrderShipped({ commit, dispatch }, orderData) {
    console.log(commit);
    console.log(orderData);
    // Update the local array

    // commit("mutSetDeliveredLocal", orderData);

    const API_URL = `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/orders/${orderData.id}?token=${process.env.VUE_APP_TOKEN}`;
    const data = {
      fulfillmentStatus: "SHIPPED",
      paymentStatus: "PAID"
    };
    axios
      .put(API_URL, data)
      .then(function() {
        dispatch("getOrders");
        //commit("mutSetOrders", response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  async markOrderPaid({ commit, dispatch }, orderData) {
    console.log(commit);
    console.log(orderData);
    // Update the local array

    // commit("mutSetDeliveredLocal", orderData);

    const API_URL = `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/orders/${orderData.id}?token=${process.env.VUE_APP_TOKEN}`;
    const data = {
      fulfillmentStatus: "DELIVERED"
    };
    axios
      .put(API_URL, data)
      .then(function() {
        dispatch("getOrders");
        //commit("mutSetOrders", response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};

// getters
export const getters = {
  allOrders: state => state.orders,
  newOrder: state => state.newOrder,
  allOrderUnfullfilled: state =>
    state.orders.filter(
      order => order.fulfillmentStatus === "AWAITING_PROCESSING"
    ),
  allOrderProcessed: state =>
    state.orders.filter(order => order.fulfillmentStatus === "PROCESSING"),
  allReadyForPickup: state =>
    state.orders.filter(
      order => order.fulfillmentStatus === "READY_FOR_PICKUP"
    ),
  allReadyForShipping: state =>
    state.orders.filter(order => order.fulfillmentStatus === "SHIPPED"),
  getOrderById: state => id => {
    console.log(id);
    return state.orders.find(order => order.id === id);
  }
};
