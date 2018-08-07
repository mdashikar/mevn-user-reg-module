const state = {
    user: {},
    url: 'http://www.account.mdashikar.com',
   // baseUrl: 'http://www.account.mdashikar.com'
}
const mutations = {
    SET_USER(state, response){
        state.user = response;
        //Object.assign(state.user, response);
    }
}   
const actions = {
    setUser: ({commit}, response) => {
        commit('SET_USER', response);
    }
}
const getters = {
    user: state => {
        return state.user;
    },
    url: state => {
        return state.url;
    },
    baseUrl: state => {
        return state.baseUrl;
    }
}


export default {
    state, mutations, actions, getters
}