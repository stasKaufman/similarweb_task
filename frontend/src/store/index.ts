import { createStore, Store } from 'vuex';
import axios from 'axios';
import { Video, State }   from '../interfaces/interfaces'


export default createStore({
  state: {
    playList: [] as Video[],
  },
  getters: {
    playList(state: State) {
      return state.playList;
    },
  },
  actions: {
    async getPlayList({ commit }) {
      const { data } = await axios.get(`http://localhost:3000/api/playlist`);
      commit('setPlayList', data);
    },
    updatePlayList({ commit },  videos: Video[] ) {
      commit('setPlayList', videos);
    },
  },
  mutations: {
    setPlayList(state: State, payload: Video[]) {
      state.playList = payload;
    },
  },
}) as Store<State>;
