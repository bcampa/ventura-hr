<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div style="display: flex; justify-content: space-between; align-items: center; flex-direction: column; width: 100%; height: 100%;">
    <UserRegistration v-if="this.currentComp === 0" />
    <AppIndex v-if="this.currentComp === 1" />
    <button style="width: 100px;" @click="changeComp">Mudar página</button>
  </div>
</template>

<script>
import AppIndex from "./components/AppIndex.vue";
import UserRegistration from "./components/UserRegistration.vue";

export default {
  name: "App",
  components: {
    AppIndex,
    UserRegistration,
  },
  data() {
  return {currentComp: 0, MAX_COMP: 1}
  },
  methods: {
    changeComp() {
      this.currentComp += 1;
      if (this.currentComp > this.MAX_COMP)
        this.currentComp %= this.MAX_COMP;
    }
  }
};



</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

body {
  background-color: #cccccc;
  margin: 0;
}

#app {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  padding: 8px;
}
</style>
