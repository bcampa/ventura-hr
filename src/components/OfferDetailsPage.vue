<template>
  <tr>
    <td valign="top">
      <p align="center">
        <span class="font-size-2"><b>Dados da Vaga</b></span>
      </p>
      <div align="center">
        <div class="center-horizontally">
          <table
            border="1"
            cellpadding="5"
            cellspacing="0"
            style="border-collapse: collapse"
            bordercolor="#111111"
            id="AutoNumber3"
            height="288"
          >
            <tr>
              <td
                align="left"
                height="22"
              >
                <span class="font-size-2">Cargo:</span>
              </td>
              <td height="22">
                {{ jobOffer.position }}
              </td>
            </tr>
            <tr>
              <td
                align="left"
                height="22"
              >
                <span class="font-size-2">Descrição:</span>
              </td>
              <td height="22">
                {{ jobOffer.description }}
              </td>
            </tr>
            <tr>
              <td
                align="left"
                height="9"
              >
                <span class="font-size-2">Cidade:</span>
              </td>
              <td height="9">
                {{ jobOffer.city }}
              </td>
            </tr>
            <tr>
              <td
                align="left"
                height="22"
              >
                <span class="font-size-2">Estado:</span>
              </td>
              <td height="22">
                {{ jobOffer.state }}
              </td>
            </tr>
            <tr>
              <td
                align="left"
                height="22"
              >
                <span class="font-size-2">Forma de Contratação:</span>
              </td>
              <td height="22">
                {{ contractTypes.get(jobOffer.contractType) }}
              </td>
            </tr>
            <tr>
              <td
                align="left"
                height="22"
              >
                <span class="font-size-2">Período de Contratação:</span>
              </td>
              <td height="22">
                {{ jobOffer.contractPeriod }}
              </td>
            </tr>
            <tr>
              <td
                align="left"
                height="22"
              >
                <span class="font-size-2">Data Limite:</span>
              </td>
              <td height="22">
                {{ $filters.dateBR(jobOffer.deadline) }}
              </td>
            </tr>
            <tr v-if="currentUser.type === userTypes.corporation && currentUser.companyId === jobOffer.corporationId">
              <td
                align="left"
                height="22"
              >
                <span class="font-size-2">Respostas:</span>
              </td>
              <td height="22">
                {{ jobOffer.responseCount }}
              </td>
            </tr>
            <tr>
              <td
                align="left"
                height="22"
              >
                <span class="font-size-2">Critérios:</span>
              </td>
              <td height="22" style="padding: 1px;">
                <table
                  border="1"
                  style="border-collapse: collapse"
                  bordercolor="#111111"
                  cellpadding="5"
                  cellspacing="0"
                  class="w-100"
                >
                  <tr>
                    <th width="148">
                      <span class="font-size-2">Nome</span>
                    </th>
                    <th width="380">
                      <span class="font-size-2">Descrição</span>
                    </th>
                    <th width="34">
                      <span class="font-size-2">Perfil</span>
                    </th>
                    <th width="34">
                      <span class="font-size-2">Peso</span>
                    </th>
                  </tr>
                  <tr
                    v-for="[index, criterion] in jobOffer.criteria?.entries()"
                    :key="index"
                  >
                    <td width="148">
                      <span class="font-size-2">{{ criterion.name }}</span>
                    </td>
                    <td width="380">
                      <span class="font-size-2">{{ criterion.description }}</span>
                    </td>
                    <td
                      width="34"
                      align="center"
                    >
                      <span class="font-size-2">{{ profiles.get(criterion.profile) }}</span>
                    </td>
                    <td
                      width="34"
                      align="center"
                    >
                      <span class="font-size-2">{{ criterion.weight }}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
        <br />
        <button type="button"
          v-if="currentUser.type === userTypes.corporation"
          @click="this.$router.push({ name: 'jobOfferResponses', params: { id: $route.params.id } })"
        >
          Ver Respostas
        </button>
        <button type="button" v-if="currentUser.type === userTypes.corporation">
          Finalizar (não implementado)
        </button>
        <button
          type="button"
          v-if="currentUser.type === userTypes.corporation && currentUser.companyId === jobOffer.corporationId"
          :disabled="jobOffer.responseCount > 0"
        >
          Editar (não implementado)
        </button>
        <button 
          v-if="currentUser.type === userTypes.applicant"
          @click="this.$router.push({ name: 'applicationCreation', params: { id: $route.params.id } })"
        >
          Responder
        </button>
        <button @click="this.$router.push({ name: 'offers' })">
          Voltar
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import requests from "../requests";
import { userTypes, profiles, contractTypes } from "../constants";

export default {
  name: "OfferDetailsPage",
  data: () => ({
    jobOffer: {},
  }),
  methods: {
    async getOfferData() {
      const response = await requests.jobOffers.getById(+this.$route.params.id);
      if (response.ok) {
        return await response.json();
      } else {
        alert("Ocorreu um erro ao tentar carregar dados da vaga");
      }
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  created: async function () {
    this.userTypes = userTypes;
    this.profiles = profiles;
    this.contractTypes = contractTypes;
    this.jobOffer = await this.getOfferData();
    this.jobOffer.criteria.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      }
      else if (a.index < b.index) {
        return -1;
      }
      else {
        return 0;
      }
    });
  },
};
</script>

<style scoped>
button {
  margin: 0 5px;
}

.w-100 {
  width: 100%;
  box-sizing: border-box;
}
</style>