import advertise from "../../api/advertise";
const state = {};
const mutations = {};
const actions = {
  async createAdvertise({ commit }, params) {
    let res = await advertise.create(params);
    return res
  },
  async getAdvertiseList({ commit }, params) {
    let res = await advertise.list(params);
    return res
  },
  async deleteAdvertise({ commit }, params) {
    let res = await advertise.destroy(params);
    return res
  },
  async getAdvertiseDetail({ commit }, params) {
    let res = await advertise.detail(params);
    return res
  },
  async updateAdvertise({ commit }, params) {
    let res = await advertise.update(params);
    return res
  },
};

export default {
  //命名空间
  namespaced: true,
  state,
  mutations,
  actions
}