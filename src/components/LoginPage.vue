<template>
  <tr>
    <td style="width: 500px;" valign="top">
      <p align="center"><span style="font-size: small;"><b>10 Últimas Vagas Publicadas</b></span></p>
      <table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-color: #111111; width: 100%;" id="AutoNumber3">
        <tr>
          <th style="width: 27%;"><span style="font-size: small;">Cargo</span></th>
          <th style="width: 52%;"><span style="font-size: small;">Descrição</span></th>
          <th style="width: 21%;"><span style="font-size: small;">Cidade</span></th>
          <th style="width: 21%;">&nbsp;</th>
        </tr>
        <tr v-for="jobOffer in jobOffers" :key="jobOffer.id">
          <td><span style="font-size: small;">{{ jobOffer.nomeDoCargo }}</span></td>
          <td>{{ jobOffer.descricao }}</td>
          <td><span style="font-size: small;">{{ jobOffer.cidade }}</span></td>
          <td><router-link :to="'/job-offer/' + jobOffer.id"><span class="material-icons">remove_red_eye</span></router-link></td>
        </tr>
      </table>
    </td>
    <td valign="top">
      <p align="center"><b><span style="font-size: small;">Acesso ao Sistema</span></b></p>
      <div align="center">
        <center>
          <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; border-color: #111111;" id="AutoNumber4">
            <tr>
              <td><b><span style="font-size: small;">Email</span></b></td>
              <td><input type="text" name="email" size="30" v-model="loginForm.email"></td>
            </tr>
            <tr>
              <td><b><span style="font-size: small;">Senha</span></b></td>
              <td><input type="password" name="senha" size="30" v-model="loginForm.password"></td>
            </tr>
            <tr>
              <td colspan="2">
                <p align="center"><input type="button" value="Entrar" @click="onSubmitLogin"></p>
              </td>
            </tr>
          </table>
        </center>
      </div>
      &nbsp;
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; border-color: #111111; width: 100%;" id="AutoNumber5">
        <tr>
          <td>
            <b><span style="font-size: small;">Não tem conta no site?</span></b>
            <p align="center">
              <span style="font-size: small;"><router-link to="/sign-up">Criar Uma Nova Conta</router-link></span>
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p style="margin-top: 0; margin-bottom: 0"><b><span style="font-size: small;">Benefícios de se cadastrar como membro:</span></b></p>
            <p style="margin-top: 0; margin-bottom: 0"><span style="font-size: small;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</span></p>
            <p style="margin-top: 0; margin-bottom: 0">&nbsp;</p>
            <p style="margin-top: 0; margin-bottom: 0">
              <span style="font-size: small;">
                Phasellus adipiscing feugiat magna. Nam pretium nisi. Aenean felis leo, sagittis ac, aliquam sed, mattis eu, ligula.
              </span>
            </p>
            <p style="margin-top: 0; margin-bottom: 0">&nbsp;</p>
            <p style="margin-top: 0; margin-bottom: 0"><span style="font-size: small;">Ut pede tortor, sodales a, hendrerit eget, pellentesque in, leo.</span></p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</template>

<script>
import requests from '../requests'

export default {
  name: 'LoginPage',
  data: () => ({
    loginForm: {
      email: null,
      password: null
    },
    jobOffers: []
  }),
  methods: {
    onSubmitLogin: async function() {
      const response = await requests.authentication.post(this.loginForm);
      if (response.ok) {
        const responseBody = await response.json();
        localStorage.setItem("bearerToken", responseBody.token);
        this.$router.push({ name: 'offers'});
      }
      else if (response.status === 404) {
        alert('Usuário e/ou senha incorretos');
      }
      else {
        alert('Ocorreu um erro ao tentar realizar login, tente novamente mais tarde');
      }
    },
    getJobOfferData: async function() {
      const filter = { page: 0, itemsPerPage: 10, paginated: true, sortingProperty: "Id", sortingDirection: "DESC" };
      const response = await requests.jobOffers.get(filter);
      if (response.ok) {
        const responseBody = await response.json();
        return responseBody.items;
      }
      else {
        alert('Ocorreu um erro ao tentar carregar as vagas');
      }
    }
  },
  created: async function() {
    this.jobOffers = await this.getJobOfferData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://fonts.googleapis.com/icon?family=Material+Icons";

body {
  background-color: #cccccc;
}
</style>