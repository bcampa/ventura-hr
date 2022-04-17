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
        <tr v-for="vacancy in mockVacancies" :key="vacancy.id">
          <td><span style="font-size: small;">{{ vacancy.position }}</span></td>
          <td>{{ vacancy.description }}</td>
          <td><span style="font-size: small;">{{ vacancy.city }}</span></td>
          <td><a href="a"><span class="material-icons">remove_red_eye</span></a></td>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LoginPage',
  data: () => ({
    loginForm: {
      email: null,
      password: null
    },
    mockVacancies: [
      { id: 1, position: "Analista JEE", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", city: "Rio de Janeiro" },
      { id: 2, position: "Programador Java", description: "Phasellus adipiscing feugiat magna.", city: "São Paulo" },
      { id: 3, position: "Gerente de Projetos", description: "Nam pretium nisi.", city: "Vitória" },
      { id: 4, position: "Suporte de Rede Wireless", description: "Aenean felis leo, sagittis ac, aliquam sed, matti seu, ligula.", city: "Brasília" },
      { id: 5, position: "Arquiteto JEE", description: "Ut pede tortor, sodales a, hendrerit eget, pellentesque in, leo.", city: "Salvador" },
      { id: 6, position: "Analista C#", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", city: "Rio de Janeiro" },
      { id: 7, position: "Programador Java", description: "Phasellus adipiscing feugiat magna.", city: "São Paulo" },
      { id: 8, position: "Gerente de Projetos", description: "	Nam pretium nisi.", city: "Vitória" },
      { id: 9, position: "Suporte de Rede Wireless", description: "Aenean felis leo, sagittis ac, aliquam sed, mattis eu, ligula.", city: "Brasília" },
      { id: 10, position: "Arquiteto C#", description: "	Ut pede tortor, sodales a, hendrerit eget, pellentesque in, leo.", city: "Salvador" }
    ]
  }),
  computed: {
    ...mapGetters(["loggedUser"])
  },
  methods: {
    ...mapActions(["login"]),
    onSubmitLogin: async function() {
      await this.login(this.loginForm);
      if (this.loggedUser != null) {
        alert(`Bem-vindo(a) ${this.loggedUser}`);
      }
        this.$router.push({ name: 'offers'});
    }
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