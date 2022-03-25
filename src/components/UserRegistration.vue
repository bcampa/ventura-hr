<template>
  <tr>
    <td valign="top">
      <p align="center">
        <font size="2"><b>Criação de Conta - Cadastramento de Usuário</b></font>
      </p>
      <div align="center">
        <center>
          <table
            border="1"
            cellpadding="5"
            cellspacing="0"
            style="border-collapse: collapse"
            bordercolor="#111111"
            id="AutoNumber3"
          >
            <tr>
              <td align="left"><font size="2">Nome:</font></td>
              <td><input type="text" name="nome" size="50" v-model="form.name"/></td>
            </tr>
            <tr>
              <td align="left"><font size="2">Endereço:</font></td>
              <td>
                <input type="text" name="endereco" size="50" v-model="form.address"/>
              </td>
            </tr>
            <tr>
              <td align="left"><font size="2">Telefone:</font></td>
              <td>
                <input type="text" name="telefone" size="30" v-model="form.phone"/>
              </td>
            </tr>
            <tr>
              <td align="left"><font size="2">Email:</font></td>
              <td><input type="text" name="email" size="30" v-model="form.email"/></td>
            </tr>
            <tr>
              <td align="left"><font size="2">Senha:</font></td>
              <td>
                <input type="password" name="senha1" size="20" v-model="form.password"/>
              </td>
            </tr>
            <tr>
              <td align="left">
                <font size="2">Confirma Senha:</font>
              </td>
              <td>
                <input type="password" name="senha2" size="20" v-model="form.confirmPassword"/>
              </td>
            </tr>
            <tr>
              <td align="left">
                <font size="2">Tipo de Conta:</font>
              </td>
              <td>
                <input
                  type="radio"
                  name="tipoConta"
                  :value=accountTypes.candidate
                  v-model="form.accountType"
                />
                Candidato
                <input
                  type="radio"
                  name="tipoConta"
                  :value=accountTypes.corporation
                  v-model="form.accountType"
                />
                Empresa
              </td>
            </tr>
            <tr>
              <td align="left"><font size="2">CPF:</font></td>
              <td><input type="text" name="cnpj" size="20" :disabled="form.accountType !== accountTypes.candidate" v-model="form.cpf"/></td>
            </tr>
            <tr>
              <td align="left">
                <font size="2">Razão Social:</font>
              </td>
              <td>
                <input type="text" name="razaoSocial" size="30" :disabled="form.accountType !== accountTypes.corporation" v-model="form.corporateName"/>
              </td>
            </tr>
            <tr>
              <td align="left"><font size="2">CNPJ:</font></td>
              <td><input type="text" name="cnpj" size="20" :disabled="form.accountType !== accountTypes.corporation" v-model="form.cnpj"/></td>
            </tr>
            <tr>
              <td colspan="2">
                <p align="center">
                  <input
                    type="button"
                    value="Criar Conta"
                    @click="onSubmit()"
                  />
                </p>
              </td>
            </tr>
          </table>
        </center>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'UserRegistration',
  data: () => ({
    form: {
      name: null,
      address: null,
      phone: null,
      email: null,
      password: null,
      confirmPassword: null,
      accountType: null,
      cpf: null,
      corporateName: null,
      cnpj: null
    }
  }),
  methods: {
    onSubmit: async function() {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const request = new Request("http://localhost:5000/user/sign-up", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(this.form)
      });
      const response = await fetch(request);
      if (response.ok) {
        alert("Cadastro realizado com sucesso.");
        this.$router.push({ name: 'index'});
      }
      else {
        alert("Algum erro ocorreu durante o cadastro.");
      }
    }
  },
  created() {
    // pseudo enum
    this.accountTypes = {
      corporation: 2,
      candidate: 3
    }
  }
}
</script>

<style></style>