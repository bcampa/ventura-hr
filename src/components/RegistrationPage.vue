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
            <p class="warning-message" v-if="valid.name === false">
              O nome inserido não é válido.
            </p>
          </div>
          
          <div class="form-item label-container">
            <label>Endereço:</label>
          </div>
          <div class="form-item">
            <input type="text" name="endereco" size="50" v-model="form.address" />
            <p class="warning-message" v-if="valid.address === false">
              O endereço inserido não é válido.
            </p>
          </div>
          
          <div class="form-item label-container">
            <label>Telefone:</label>
          </div>
          <div class="form-item">
            <input type="text" name="telefone" size="30" v-model="form.phone" />
            <p class="warning-message" v-if="valid.phone === false">
              O número inserido não é válido.
            </p>
          </div>
          
          <div class="form-item label-container">
            <label>Email:</label>
          </div>
          <div class="form-item">
            <input type="text" name="email" size="30" v-model="form.email" />
            <p class="warning-message" v-if="valid.email === false">
              O email inserido não é válido.
            </p>
          </div>
          
          <div class="form-item label-container">
            <label>Senha:</label>
          </div>
          <div class="form-item">
            <input type="password" name="senha1" size="20" v-model="form.password" />
            <p class="warning-message" v-if="valid.password === false">
              A senha inserida não é válida.
            </p>
          </div>
          
          <div class="form-item label-container">
            <label>Confirma Senha:</label>
          </div>
          <div class="form-item">
            <input type="password" name="senha2" size="20" v-model="form.confirmPassword" />
            <p class="warning-message" v-if="valid.confirmPassword === false">
              As senhas inseridas não correspondem.
            </p>
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
          <p class="warning-message" v-if="valid.accountType === false">
            O tipo da conta precisa ser selecionado.
          </p>
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
            <p class="warning-message" v-if="valid.cpf === false">
              O CPF inserido não é válido.
            </p>
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
            <p class="warning-message" v-if="valid.corporateName === false">
              A Razão Social inserida não é válida.
            </p>
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
            <p class="warning-message" v-if="valid.cnpj === false">
              O CNPJ inserido não é válida.
            </p>
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
import { userTypes } from '../constants'

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
    },
    valid: {
      name: null,
      address: null,
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
      this.validateFields();
      if (!this.fieldsAreValid()) {
        return;
      }
      const response = await requests.user.post(this.form);
      if (response.ok) {
        alert("Cadastro realizado com sucesso.");
        this.$router.push({ name: 'index'});
      }
      else {
        alert("Algum erro ocorreu durante o cadastro.");
      }
    },
    fieldsAreValid() {
      for (const key in this.valid) {
        if (this.valid[key] !== true) {
          return false;
        }
      }
      return true;
    },
    validateFields() {
      this.validateName();
      this.validateAddress();
      this.validatePhone();
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmPassword();
      this.validateAccountType();
      this.validateCpf();
      this.validateCorporateName();
      this.validateCnpj();
    },
    validateName() {
      // placeholder
      this.valid.name = this.form.name?.length > 1 && this.form.name?.length < 100;
    },
    validateAddress() {
      // placeholder
      this.valid.address = this.form.address?.length > 1 && this.form.address?.length < 100;
    },
    validatePhone() {
      // placeholder
      this.valid.phone = this.form.phone?.length >= 8 && this.form.phone?.length <= 12;
    },
    validateEmail() {
      // placeholder
      this.valid.email = this.form.email?.length > 1 && this.form.email?.length < 100;
    },
    validatePassword() {
      // placeholder
      this.valid.password = this.form.password?.length > 1 && this.form.password?.length < 100;
    },
    validateConfirmPassword() {
      this.valid.confirmPassword = this.form.password === null || this.form.confirmPassword === this.form.password;
    },
    validateAccountType() {
      this.valid.accountType = this.form.accountType === this.userTypes.applicant || this.form.accountType === this.userTypes.corporation;
    },
    validateCpf() {
      if (this.form.accountType != this.userTypes.applicant) {
        this.valid.cpf = true;
        return;
      }

      if (this.form.cpf == null) {
        this.valid.cpf = false;
        return;
      }

      const pattern = /^\d{11}$/;
      if (!pattern.test(this.form.cpf)) {
        this.valid.cpf = false;
        return;
      }

      let firstSum = 0;
      let secondSum = 0;

      for (let i = 0; i <= 9; i++)
      {
        if (i < 9) {
          firstSum += +this.form.cpf[i] * (i + 1);
        }

        secondSum += +this.form.cpf[i] * (i % 10);
      }

      const firstVerifyingDigit = (firstSum % 11) % 10;
      const secondVerifyingDigit = (secondSum % 11) % 10;

      this.valid.cpf = (+this.form.cpf[9] == firstVerifyingDigit && +this.form.cpf[10] == secondVerifyingDigit);
    },
    validateCorporateName() {
      this.valid.corporateName = this.form.accountType !== this.userTypes.corporation || this.form.corporateName?.length > 1 && this.form.corporateName?.length < 100;
    },
    validateCnpj() {
      if (this.form.accountType !== this.userTypes.corporation) {
        this.valid.cnpj = true;
        return;
      }

      if (this.form.cnpj == null) {
        this.valid.cnpj = false;
        return;
      }

      const pattern = /^\d{14}$/;
      if (!pattern.test(this.form.cnpj)) {
        this.valid.cnpj = false;
        return;
      }

      const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

      let firstSum = 0;
      for (let i = 0; i < 12; i++)
      {
        firstSum += +this.form.cnpj[i] * weights[i + 1];
      }

      const firstRemainder = firstSum % 11;
      const firstVerifyingDigit = firstRemainder < 2 ? 0 : 11 - firstRemainder;

      let secondSum = 0;
      for (let i = 0; i < 13; i++)
      {
        secondSum += +this.form.cnpj[i] * weights[i];
      }

      const secondRemainder = secondSum % 11;
      const secondVerifyingDigit = secondRemainder < 2 ? 0 : 11 - secondRemainder;

      this.valid.cnpj = (+this.form.cnpj[12] == firstVerifyingDigit && +this.form.cnpj[13] == secondVerifyingDigit);
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

.warning-message {
  color: red;
  font-size: small;
  margin: 2px 0px;
}
</style>