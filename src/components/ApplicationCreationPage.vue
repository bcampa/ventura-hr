<template>
  <tr>
    <td
      valign="top"
    >
      <p align="center">
        <span class="font-size-2"><b>Responder Vaga</b></span>
      </p>
      <p align="center">
        <!-- TODO Alterar informação empresa -->
        <span class="font-size-2"><b>Cargo:</b> {{ jobOffer.position }} | <b>Empresa:</b> Infnet | <b>Cidade: </b>{{ jobOffer.city }} - {{ jobOffer.state }}</span>
      </p>
      <form @submit.prevent="submitCreation()">
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
              <span class="font-size-2">Descrição</span>
            </th>
            <th width="34">
              <span class="font-size-2">Perfil</span>
            </th>
            <th width="34">
              <span class="font-size-2">Resposta</span>
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
            <td>
              <select
                name="resposta"
                required
                  v-model="application.criterionResponses[index].response"
              >
                <option
                  v-for="[key, name] of criterionResponses.entries()"
                  :key="key"
                  :value="key"
                >
                  {{ name }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
          </tr>
          <tr>
            <td
              colspan="8"
              align="center"
            >
              <button type="submit">
                Enviar Resposta
              </button>
              &nbsp;
              <button type="button" @click="returnToPreviousPage()">
                Voltar
              </button>
            </td>
          </tr>
        </table>
      </form>
    </td>
  </tr>
</template>

<script>
import requests from "../requests";
import { userTypes, profiles, contractTypes, criterionResponses } from "../constants";

export default {
  name: "ApplicationCreationPage",
  data: () => ({
    jobOffer: {},
    application: {
      jobOfferId: null,
      criterionResponses: [],
    },
  }),
  methods: {
    returnToPreviousPage() {
      this.$router.push({ name: "offerDetails", params: { id: this.$route.params.id } });
    },
    async getOfferData() {
      const response = await requests.jobOffers.getById(+this.$route.params.id);
      if (response.ok) {
        return await response.json();
      } else {
        alert("Ocorreu um erro ao tentar carregar dados da vaga");
      }
    },
    submitCreation: async function () {
      const response = await requests.jobOfferResponses.post(this.application);
      if (response.ok) {
        alert("Cadastro realizado com sucesso.");
        this.returnToPreviousPage();
      }
      else {
        alert("Algum erro ocorreu durante o cadastro.");
      }
    },
  },
  created: async function() {
    this.userTypes = userTypes;
    this.profiles = profiles;
    this.contractTypes = contractTypes;
    this.criterionResponses = criterionResponses;
    this.weightOptions = [1, 2, 3, 4, 5];

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

    this.application.jobOfferId = this.jobOffer.id;
    for (const criterion of this.jobOffer.criteria) {
      this.application.criterionResponses.push({
        criterionId: criterion.id,
        response: null,
      });
    }
  },
};
</script>

<style scoped>
.icon-button {
  cursor: pointer;
}
</style>