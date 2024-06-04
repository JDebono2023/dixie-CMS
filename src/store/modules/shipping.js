/* eslint-disable prettier/prettier */
import axios from "axios";

// NOTE state
export const state = {
	shippingOptions: [],
};

export const mutations = {
	mutLoadShippingOptions(state, shippingOptions) {
		state.shippingOptions = shippingOptions;
	},
};

export const actions = {
	getShippingOptions({ commit }) {
		return new Promise((resolve, reject) => {
			const API_URL = `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/profile/shippingOptions?token=${process.env.VUE_APP_TOKEN}`;
			const options = {};

			axios
				.get(API_URL, options)
				.then(function(response) {
					console.log(response.data);
					commit("mutLoadShippingOptions", response.data);
					resolve(response.data);
				})
				.catch(function(error) {
					console.log(error);
					reject(error);
				});
		});
	},
};

export const getters = {
	shippingOptions: state => state.shippingOptions,
	shipOptions: state => state.shippingOptions.filter(x => x.enabled == true),
};
// });
