const state = () => ({
  loggedUser: null
})
const mutations = {
  setLoggedUser(state, user) {
    state.loggedUser = user;
  }
}
const getters = {
  loggedUser: state => state.loggedUser
}
const actions = {
  async login({ commit }, user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const request = new Request("http://localhost:5000/authentication", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
      }
    );
    const response = await fetch(request);
    if (response.ok) {
      const responseBody = await response.json();
      localStorage.setItem("bearerToken", responseBody.token);
      commit("setLoggedUser", responseBody);
    }
    else {
      console.log(response);
    }
  }
}

export default {
  state,
  mutations,
  getters,
  actions,
}