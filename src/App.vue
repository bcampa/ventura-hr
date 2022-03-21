<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div align="center">
    <center>
      <table 
        border="0"
        cellpadding="10"
        cellspacing="0"
        style="border-collapse: collapse; border-color: #111111; width: 780px; background-color: #FFFFFF;"
        id="AutoNumber1"
      >
        <tr>
          <td style="width: 100%; background-color:#808080;">
            <span style="font-weight: bold; font-size: large; color: #FFFFFF">
              VenturaHR (cabeçalho)
            </span>
          </td>
        </tr>
        <tr>
          <td style="width: 100%;">
            <table
              border="1"
              cellpadding="5"
              cellspacing="0"
              style="border-collapse: collapse; border-color: #111111; width: 100%;"
              id="AutoNumber2"
            >
              <router-view />
            </table>
          </td>
        </tr>
        <tr>
          <td
            style="width: 100%; background-color:#808080;"
          >
            <span style="font-weight: bold; font-size: large; color: #FFFFFF">
              (rodape)
            </span>
          </td>
        </tr>
      </table>
    </center>
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

/* #app {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  padding: 8px;
} */
</style>
