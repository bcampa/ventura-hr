<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div align="center">
    <div 
      style="border-collapse: collapse; border-color: #111111; width: 780px; background-color: #FFFFFF;"
      id="AutoNumber1"
    >
      <header style="width: 100%; background-color:#808080; color: #FFFFFF; text-align: left;">
        <h2 style="font-weight: bold; font-size: large; padding: 10px; margin: 0;">
          VenturaHR (cabeçalho)
        </h2>
      </header>
      <main style="width: 100%; padding: 10px; box-sizing: border-box;">
        <div
          style="border: 1px solid #111; border-collapse: collapse; width: 100%; padding: 5px; box-sizing: border-box;"
          id="AutoNumber2"
        >
          <router-view />
        </div>
      </main>
      <footer style="width: 100%; background-color:#808080; color: #FFFFFF; text-align: left;">
        <h2 style="font-weight: bold; font-size: large; padding: 10px; margin: 0;">
          (rodape)
        </h2>
      </footer>
    </div>
  </div>

</template>

<script>
export default {
  name: "App"
}
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
}

.center-horizontally {
  display: flex;
  justify-content: center;
}

.font-size-2 {
  font-size: small;
}

/* #app {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  padding: 8px;
} */
</style>
