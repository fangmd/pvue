export default {
  namespaced: true,
  state: {
    name: 'fang',
  },
  getters: {},
  mutations: {
    setName(state, payload) {
      state.name = payload;
    },
  },
  actions: {},
};
