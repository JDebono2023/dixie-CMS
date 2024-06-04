/* eslint-disable prettier/prettier */
import axios from "axios";

// NOTE state
export const state = {
	status: null,
};

export const mutations = {
	TOGGLE_STATUS(state) {
		state.status = !state.status;
	},
	LOAD_STATUS(state, status) {
		state.status = status;
	},
};

export const actions = {
	// eslint-disable-next-line prettier/prettier
	//turn store off or on depending on existing status in state
	toggleStatus({ commit, state }) {
		const options = {
			method: "PUT",
			url: `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/profile?token=${process.env.VUE_APP_TOKEN}`,
			params: { token: "token" },
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			data: { settings: { closed: !state.status } },
		};

		axios
			.request(options)
			.then(function() {
				commit(`TOGGLE_STATUS`);
			})
			.catch(function(error) {
				console.log(error);
			});
	},
	//get current status of the store: open or closed and send to state
	getStatus({ commit }) {
		return new Promise((resolve, reject) => {
			const API_URL = `https://app.ecwid.com/api/v3/${process.env.VUE_APP_STOREID}/profile?token=${process.env.VUE_APP_TOKEN}`;

			axios
				.get(API_URL)
				.then(function(response) {
					commit("LOAD_STATUS", response.data.settings.closed);
					resolve(response.data.settings.closed);
				})
				.catch(function(error) {
					console.log(error);
					reject(error);
				});
		});
	},
};

//   modules: {},
export const getters = {
	storeStatus: state => state.status,
};
// });
