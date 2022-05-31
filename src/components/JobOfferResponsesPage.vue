<template>
  <tr>
    <td
      valign="top"
    >
      <p align="center">
        <span class="font-size-2"><b>Respostas da Vaga</b></span>
      </p>
      <p align="center">
        <span class="font-size-2"><b>Cargo:</b> {{ jobOffer.position }} | <b>Empresa:</b> {{ jobOffer.companyName }} | <b>Cidade: </b>{{ jobOffer.city }} - {{ jobOffer.state }} | <b>Perfil:</b> {{ jobOffer.profile }}</span>
      </p>
      <table
        border="1"
        style="border-collapse: collapse"
        bordercolor="#111111"
        cellpadding="5"
        cellspacing="0"
      >
        <tr>
          <th width="148">
            <span class="font-size-2">Nome</span>
          </th>
          <th width="380">
            <span class="font-size-2">E-mail</span>
          </th>
          <th width="34">
            <span class="font-size-2">Pontuação</span>
          </th>
        </tr>
        <tr
          v-for="application in applications"
          :key="application.id"
        >
          <td width="148">
            <span class="font-size-2">{{ application.applicantName }}</span>
          </td>
          <td width="380">
            <span class="font-size-2">{{ application.applicantEmail }}</span>
          </td>
          <td
            width="34"
            align="center"
          >
            <span class="font-size-2">{{ application.score }}</span>
          </td>
        </tr>
        <tr>
        </tr>
        <tr>
          <td
            colspan="8"
            align="center"
          >
            <button type="button" @click="returnToPreviousPage()">
              Voltar
            </button>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</template>

<script>
import requests from "../requests";
import { userTypes, profiles, contractTypes, criterionResponses } from "../constants";

export default {
  name: "JobOfferResponsesPage",
  data: () => ({
    jobOffer: {},
    applications: [],
  }),
  methods: {
    returnToPreviousPage() {
      this.$router.push({ name: "offerDetails", params: { id: this.$route.params.id } });
    },
    async getOfferData() {
      const response = await requests.jobOffers.getById(+this.$route.params.id);
      if (response.ok) {
        return await response.json();
      }
      else {
        alert("Ocorreu um erro ao tentar carregar dados da vaga");
      }
    },
    async getApplicationsData() {
      const response = await requests.jobOffers.getResponsesById(+this.$route.params.id);
      if (response.ok) {
        return await response.json();
      }
      else {
        alert("Ocorreu um erro ao tentar carregar dados das respostas");
      }
    },
  },
  created: async function() {
    this.userTypes = userTypes;
    this.profiles = profiles;
    this.contractTypes = contractTypes;
    this.criterionResponses = criterionResponses;

    this.jobOffer = await this.getOfferData();
    this.applications = await this.getApplicationsData();
  },
};
</script>

<style scoped>
.icon-button {
  cursor: pointer;
}
</style>