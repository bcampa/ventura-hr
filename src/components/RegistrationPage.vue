<template>
  <tr>
    <td valign="top">

      <p align="center"><font size="2"><b>Criação de Conta - Cadastramento de Usuário</b></font></p>
      <div class="center-horizontally">
        <form
          id="AutoNumber3"
          @submit="onSubmit"
        >
          
          <div class="form-item label-container">
            <label>Nome:</label>
          </div>
          <div class="form-item">
            <input type="text" name="nome" size="50" v-model="form.name" />
          </div>
          
          <div class="form-item label-container">
            <label>Endereço:</label>
          </div>
          <div class="form-item">
            <input type="text" name="endereco" size="50" v-model="form.address" />
          </div>
          
          <div class="form-item label-container">
            <label>Telefone:</label>
          </div>
          <div class="form-item">
            <input type="text" name="telefone" size="30" v-model="form.phone" />
          </div>
          
          <div class="form-item label-container">
            <label>Email:</label>
          </div>
          <div class="form-item">
            <input type="text" name="email" size="30" v-model="form.email" />
          </div>
          
          <div class="form-item label-container">
            <label>Senha:</label>
          </div>
          <div class="form-item">
            <input type="password" name="senha1" size="20" v-model="form.password" />
          </div>
          
          <div class="form-item label-container">
            <label>Confirma Senha:</label>
          </div>
          <div class="form-item">
            <input type="password" name="senha2" size="20" v-model="form.confirmPassword" />
          </div>
          
          <div class="form-item label-container">
            <label>Tipo de Conta:</label>
          </div>
          <div class="form-item">
            <input
              type="radio"
              name="tipoConta"
              :value=userTypes.applicant
              v-model="form.accountType"
            />
            Candidato
            <input
              type="radio"
              name="tipoConta"
              :value=userTypes.corporation
              v-model="form.accountType"
            />
            Empresa
          </div>
          
          <div class="form-item label-container">
            <label>CPF:</label>
          </div>
          <div class="form-item">
            <input
              type="text"
              name="cpf"
              size="20"
              :disabled="form.accountType !== userTypes.applicant"
              v-model="form.cpf"
            >
          </div>
          
          <div class="form-item label-container">
            <label>Razão Social:</label>
          </div>
          <div class="form-item">
            <input
              type="text"
              name="razaoSocial"
              size="30" 
              :disabled="form.accountType !== userTypes.corporation"
              v-model="form.corporateName"
            />
          </div>
          
          
          <div class="form-item label-container">
            <label>CNPJ:</label>
          </div>
          <div class="form-item">
            <input
              type="text"
              name="cnpj"
              size="20"
              :disabled="form.accountType !== userTypes.corporation"
              v-model="form.cnpj"
            />
          </div>
          
          <div class="form-item form-send-button-container">
            <button type="submit">Criar Conta</button>
          </div>
          
        </form>
      </div>
    </td>
  </tr>
</template>

<script>
import requests from '../requests'
import userTypes from '../constants'

export default {
  name: 'RegistrationPage',
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
    onSubmit: async function(event) {
      event.preventDefault();
      const response = await requests.authentication.post(this.form);
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
    this.userTypes = userTypes;
  }
}
</script>

<style scoped>
#AutoNumber3 {
  display: grid;
  background-color: #111;
  border: 1px solid #111;
  grid-template-columns: repeat(2, max-content);
  gap: 1px;
  text-align: left;
}

#AutoNumber3 > * {
  background-color: #FFF;
}

.form-item {
  padding: 5px;
}

.label-container {
  display: flex;
  align-items: center;
  font-size: small;
}

.center-horizontally {
  display: flex;
  justify-content: center;
}

.form-send-button-container {
  grid-column: 1 / span 2;
  display: flex;
  justify-content: center;
}
</style>