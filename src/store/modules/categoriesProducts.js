/* eslint-disable prettier/prettier */
import axios from "axios";

// NOTE state
// export const state = {
// 	categories: [],
// 	products: [],
// };

export const state = { state: () => {
    return { categories: [], products: [] };
  },};

export const mutations = {
	LOAD_CATEGORIES(state, categories) {
		state.categories = categories;
	},
	mutLoadProducts(state, products) {
		state.products = products;
	},
};

export const actions = {
	getCategories({ commit }) {
		return new Promise((resolve, reject) => {
			// returns active categories only: add &hidden_categories=true to url end to see active and inactive
			const API_URL = `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/categories?token=${process.env.VUE_APP_TOKEN}&hidden_categories=true`;
			const options = {};

			axios
				.get(API_URL, options)
				.then(function(response) {
					// console.log(response.data.items);
					commit("LOAD_CATEGORIES", response.data.items);
					resolve(response.data.items);
				})
				.catch(function(error) {
					console.log(error);
					reject(error);
				});
		});
	},
	getProducts({ commit }, categorieid) {
		console.log(categorieid);
		return new Promise((resolve, reject) => {
			const API_URL = `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/products?token=${process.env.VUE_APP_TOKEN}&category=${categorieid}`;
			const options = {};

			axios
				.get(API_URL, options)
				.then(function(response) {
					// console.log(response.data.items);
					commit("mutLoadProducts", response.data.items);
					resolve(response.data.items);
					console.log(response.data.items);
				})
				.catch(function(error) {
					console.log(error);
					reject(error);
				});
		});
	},
};

export const getters = {
	categories: state => state.categories,
	activeCategories: state => state.categories.filter(x => x.enabled == true),
	products: state => state.products,
	sortedProducts: state => state.products.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      })
};
// });
