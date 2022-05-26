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
                {{ formatDate(jobOffer.deadline) }}
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
                    v-for="[index, criterion] in jobOffer.criteria.entries()"
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
        <button @click="this.$router.push({ name: 'offers' })">
          Voltar
        </button>
      </div>
    </td>
    <td
      valign="top"
      v-if="currentPage === 2"
    >
      <p align="center">
        <span class="font-size-2"><b>Publicar Vaga - Dados dos Critérios - Página 2 de 2</b></span>
      </p>
      <p align="center">
        <span class="font-size-2"><b>Cargo:</b> {{ form.position }} | <b>Empresa:</b> Infnet | <b>Cidade: </b>{{ form.city }} - {{ form.state }}</span>
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
            <span class="font-size-2">Descrição</span>
          </th>
          <th width="34">
            <span class="font-size-2">Perfil</span>
          </th>
          <th width="34">
            <span class="font-size-2">Peso</span>
          </th>
          <th width="53">&nbsp;</th>
        </tr>
        <tr>
          <td>
            <input
              class="w-100"
              type="text"
              name="nome"
              size="5"
              required
              v-model.trim="newCriterionForm.name"
            >
          </td>
          <td>
            <input
              class="w-100"
              type="text"
              name="descricao"
              size="5"
              required
              v-model.trim="newCriterionForm.description"
            >
          </td>
          <td>
            <select
              name="perfil"
              required
              v-model="newCriterionForm.profile"
            >
              <option
                v-for="[key, name] of profiles.entries()"
                :key="key"
                :value="key"
              >
                {{ name }}
              </option>
            </select>
          </td>
          <td>
            <select
              name="peso"
              required
              v-model="newCriterionForm.weight"
            >
              <option
                v-for="option of weightOptions"
                :key="option"
                :value="option"
              >{{ option }}</option>
            </select>
          </td>
          <td align="center"><span
              class="material-icons icon-button"
              @click="addNewCriterion()"
            >add_box</span></td>
        </tr>
      </table>
      <br />
      <table
        border="1"
        style="border-collapse: collapse"
        bordercolor="#111111"
        cellpadding="5"
        cellspacing="0"
      >
        <tr
          v-for="[index, criterion] in form.criteria.entries()"
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
          <td
            align="center"
            width="53"
          >
            <span class="material-icons icon-button">edit</span>
          </td>
          <td
            align="center"
            width="53"
          >
            <span
              class="material-icons icon-button"
              @click="removeCriterion(index)"
            >
              delete
            </span>
          </td>
          <td
            align="center"
            width="53"
          >
            <span
              class="material-icons icon-button"
              @click="shiftCriterionUp(index)"
            >
              arrow_upward
            </span>
          </td>
          <td
            align="center"
            width="54"
          >
            <span
              class="material-icons icon-button"
              @click="shiftCriterionDown(index)"
            >
              arrow_downward
            </span>
          </td>
        </tr>
        <tr>
        </tr>
        <tr>
          <td
            colspan="8"
            align="center"
          >
            <button @click="submitCreation()">
              Publicar Vaga
            </button>
            <button @click="returnToPreviousPage()">
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
    // TODO: mover esse método para fora dos componentes
    formatDate(date) {
      return new Intl.DateTimeFormat('pt-BR', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(new Date(date));
    }
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
.icon-button {
  cursor: pointer;
}

.w-100 {
  width: 100%;
  box-sizing: border-box;
}
</style>