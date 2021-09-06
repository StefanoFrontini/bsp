// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import Vuex from "vuex";
import axios from "axios";

export default function(Vue, { router, head, isClient, appOptions }) {
  Vue.use(Vuex);
  Vue.prototype.$http = axios;

  const token = process.isClient
    ? localStorage.getItem(`Bearer ${token}`)
    : false;

  if (token) {
    Vue.prototype.$http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  appOptions.store = new Vuex.Store({
    state: {
      status: "",
      token: process.isClient ? localStorage.getItem("token") || "" : false,
      user: {},
      evento: {},
      messageAlert: "",
      messageSuccess: "",
      messageSuccessActive: false,
      messageAlertActive: false,
      loading: false,
    },
    mutations: {
      ON(state) {
        state.loading = true;
      },
      OFF(state) {
        state.loading = false;
      },
      AUTH_REQUEST(state) {
        state.status = "loading";
      },
      AUTH_SUCCESS(state, { token, user }) {
        (state.status = "success"), (state.token = token), (state.user = user);
      },
      AUTH_ERROR(state) {
        state.status = "error";
      },
      LOGOUT(state) {
        (state.status = "logged out"), (state.token = "");
      },
      CURRENT_EVENT(state, event) {
        state.evento = event;
      },
      CURRENT_MESSAGE_ALERT(state, msg) {
        state.messageAlert = msg;
      },
      CURRENT_MESSAGE_SUCCESS(state, msg) {
        state.messageSuccess = msg;
      },
      MESSAGE_SUCCESS_ACTIVE(state, msg) {
        state.messageSuccessActive = msg;
      },
      MESSAGE_ALERT_ACTIVE(state, msg) {
        state.messageAlertActive = msg;
      },
    },
    actions: {
      message_alert({ commit }, msg) {
        commit("CURRENT_MESSAGE_ALERT", msg);
      },
      message_alert_active({ commit }, msg) {
        commit("MESSAGE_ALERT_ACTIVE", msg);
      },
      message_success({ commit }, msg) {
        commit("CURRENT_MESSAGE_SUCCESS", msg);
      },
      message_success_active({ commit }, msg) {
        commit("MESSAGE_SUCCESS_ACTIVE", msg);
      },
      update_event({ commit }, event) {
        commit("CURRENT_EVENT", event);
      },
      async login({ commit }, user) {
        commit("AUTH_REQUEST");
        await axios
          .post(process.env.GRIDSOME_STRAPI_LOGIN_URL, user)
          .then((response) => {
            const token = response.data.jwt;
            const user = response.data.user;

            if (process.isClient) {
              localStorage.setItem("token", JSON.stringify(token));
              localStorage.setItem("user", JSON.stringify(user));
            }
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            commit("AUTH_SUCCESS", { token, user });
          })

          .catch((error) => {
            process.isClient ? localStorage.removeItem("token") : false;
            commit("AUTH_ERROR");
            console.log("error.response.data", error.response.data);
            if (error.response.data.data[0].messages[0].message) {
              if (
                error.response.data.data[0].messages[0].message.includes(
                  "10.00 seconds"
                )
              ) {
                let messageA = "Riprova ad accedere tra 10 secondi";
                appOptions.store.dispatch("message_alert", messageA);
                appOptions.store.dispatch("message_alert_active", true);
                setTimeout(
                  () =>
                    appOptions.store.dispatch("message_alert_active", false),
                  7000
                );
              } else {
                throw `Server error: ${
                  error.response.data.data[0].messages[0].message
                }`;
              }
            } else {
              throw `Server error: ${error.response.data}`;
            }
            throw `Server error: ${error.response.data.message}`;
          });
      },
      async register({ commit }, user) {
        commit("AUTH_REQUEST");
        await axios
          .post(process.env.GRIDSOME_STRAPI_REGISTER_URL, user)
          .then((response) => {
            const token = response.data.jwt;
            const user = response.data.user;

            process.isClient ? localStorage.setItem("token", token) : false;

            process.isClient
              ? localStorage.setItem("user", JSON.stringify(user))
              : false;

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            commit("AUTH_SUCCESS", { token, user });
          })
          .catch((error) => {
            process.isClient ? localStorage.removeItem("token") : false;
            console.error("main.js:", error.response.data);
            commit("AUTH_ERROR");
            if (error.response.data.data[0].messages[0].message) {
              if (
                error.response.data.data[0].messages[0].message.includes(
                  "10.00 seconds"
                )
              ) {
                let messageA = "Riprova ad accedere tra 10 secondi";
                appOptions.store.dispatch("message_alert", messageA);
                appOptions.store.dispatch("message_alert_active", true);
                setTimeout(
                  () =>
                    appOptions.store.dispatch("message_alert_active", false),
                  7000
                );
              } else if (
                error.response.data.data[0].messages[0].message.includes(
                  "Email is already taken"
                )
              ) {
                let messageA = "Utente già registrato! Riprova o accedi";
                appOptions.store.dispatch("message_alert", messageA);
                appOptions.store.dispatch("message_alert_active", true);
                setTimeout(
                  () =>
                    appOptions.store.dispatch("message_alert_active", false),
                  7000
                );
                throw `Server error: ${
                  error.response.data.data[0].messages[0].message
                }`;
              } else {
                throw `Server error: ${
                  error.response.data.data[0].messages[0].message
                }`;
              }
            } else {
              throw `Server error: ${error.response.data}`;
            }
          });
      },
      logout({ commit }) {
        process.isClient ? localStorage.removeItem("token") : false;
        delete axios.defaults.headers.common["Authorization"];
        commit("LOGOUT");
      },
    },
    getters: {
      isLoggedIn: (state) => !!state.token,
      authStatus: (state) => state.status,
      currentEvent: (state) => state.evento,
      messageAlert: (state) => state.messageAlert,
      messageSuccess: (state) => state.messageSuccess,
      messageAlertActive: (state) => state.messageAlertActive,
      messageSuccessActive: (state) => state.messageSuccessActive,
      username: (state) => state.user.username,
      email: (state) => state.user.email,
    },
  });

  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout), (head.htmlAttrs = { lang: "it-IT" });

  Vue.prototype.$http.interceptors.request.use((config) => {
    appOptions.store.commit("ON");
    return config;
  });

  Vue.prototype.$http.interceptors.response.use(
    (response) => {
      appOptions.store.commit("OFF");

      return response;
    },
    (error) => {
      appOptions.store.commit("OFF");
      return Promise.reject(error);
    }
  );
}
