<template>
  <tr>
    <td
      valign="top"
      v-if="currentPage === 1"
    >
      <p align="center">
        <span class="font-size-2"><b>Publicar Vaga - Dados da Vaga - Página 1 de 2</b></span>
      </p>
      <div align="center">
        <form 
          @submit="currentPage = 2"
          class="center-horizontally">
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
                <input
                  type="text"
                  name="cargo"
                  size="30"
                  required
                  v-model.trim="form.position"
                >
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
                <input
                  type="text"
                  name="descricao"
                  size="50"
                  required
                  v-model.trim="form.description"
                >
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
                <input
                  type="text"
                  name="cidade"
                  size="30"
                  required
                  v-model.trim="form.city"
                >
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
                <input
                  name="estado"
                  size="5"
                  minlength="2"
                  maxlength="2"
                  required
                  v-model.trim="form.state"
                >
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
                <select
                  size="1"
                  name="forma"
                  required
                  v-model="form.contractType"
                >
                  <option
                    v-for="[key, name] of contractTypes.entries()"
                    :key="key"
                    :value="key"
                  >
                    {{ name }}
                  </option>
                </select>
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
                <input
                  type="text"
                  name="periodo"
                  size="30"
                  required
                  v-model.trim="form.contractPeriod"
                >
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
                <input
                  type="date"
                  name="datalimite"
                  size="30"
                  required
                  v-model="form.deadline"
                >
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
                height="27"
              >
                <p align="center">
                  <button
                    type="submit"
                  >
                    Cadastrar Critérios
                  </button>
                  <button @click="returnToPreviousPage()">
                    Cancelar
                  </button>
                </p>
              </td>
            </tr>
          </table>
        </form>
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
              <option v-for="option of weightOptions" :key="option" :value="option">{{ option }}</option>
            </select>
          </td>
          <td align="center"><span class="material-icons icon-button" @click="addNewCriterion()">add_box</span></td>
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
  name: "JobOfferCreationPage",
  data: () => ({
    currentPage: 1,
    form: {
      position: '',
      description: '',
      city: '',
      state: '',
      contractType: null,
      contractPeriod: '',
      deadline: null,
      criteria: [
        {
          name: "Linguagem Java",
          description: "Conhecimento de desenvolvimento em Java",
          profile: 4,
          weight: 5,
          index: 0,
        },
        {
          name: "Inglês",
          description: "Leitura de manuais técnicos",
          profile: 2,
          weight: 3,
          index: 1,
        },
        {
          name: "Servlets e JSP",
          description: "Conhecimento em desenvolvimento web com MVC",
          profile: 5,
          weight: 5,
          index: 2,
        },
      ],
    },
    newCriterionForm: {
      name: "",
      description: "",
      profile: null,
      weight: null,
    },
  }),
  methods: {
    returnToPreviousPage() {
      if (this.currentPage === 1) {
        this.$router.push({ name: "offers" });
      }
      else if (this.currentPage === 2) {
        this.currentPage = 1;
      }
    },
    addNewCriterion() {
      const criterionIsValid = this.validateNewCriterion();
      if (!criterionIsValid) {
        return;
      }
      this.form.criteria.push({
        name: this.newCriterionForm.name,
        description: this.newCriterionForm.description,
        profile: this.newCriterionForm.profile,
        weight: this.newCriterionForm.weight,
        index: this.form.criteria.length,
      });
      this.resetNewCriterionForm();
    },
    validateNewCriterion() {
      if (!this.newCriterionForm.name) {
        alert("O nome do critério deve ser preenchido");
        return false;
      }
      if (!this.newCriterionForm.description) {
        alert("A descrição do critério deve ser preenchida");
        return false;
      }
      if (!this.newCriterionForm.profile) {
        alert("O perfil do critério deve ser selecionado");
        return false;
      }
      if (!this.newCriterionForm.weight) {
        alert("O peso do critério deve ser selecionado");
        return false;
      }
      return true;
    },
    resetNewCriterionForm() {
      this.newCriterionForm = {
        name: "",
        description: "",
        profile: null,
        weight: null,
      };
    },
    shiftCriterionUp(criterionIndex) {
      if (criterionIndex === 0) {
        return;
      }
      this.form.criteria[criterionIndex].index--;
      this.form.criteria[criterionIndex - 1].index++;
      const criterion = this.form.criteria.splice(criterionIndex, 1)[0];
      this.form.criteria.splice(criterionIndex - 1, 0, criterion);
    },
    shiftCriterionDown(criterionIndex) {
      if (criterionIndex === this.form.criteria.length - 1) {
        return;
      }
      this.form.criteria[criterionIndex].index++;
      this.form.criteria[criterionIndex + 1].index--;
      const criterion = this.form.criteria.splice(criterionIndex + 1, 1)[0];
      this.form.criteria.splice(criterionIndex, 0, criterion);
    },
    removeCriterion(criterionIndex) {
      this.form.criteria.splice(criterionIndex, 1);
    },
    submitCreation: async function (event) {
      event?.preventDefault();
      if (this.form.criteria.length === 0) {
        alert('Pelo menos um critério deve ser adicionado');
        return;
      }
      const response = await requests.jobOffers.post(this.form);
      if (response.ok) {
        alert("Cadastro realizado com sucesso.");
        this.$router.push({ name: "offers" });
      }
      else {
        alert("Algum erro ocorreu durante o cadastro.");
      }
    },
  },
  created() {
    this.userTypes = userTypes;
    this.profiles = profiles;
    this.contractTypes = contractTypes;
    this.weightOptions = [1, 2, 3, 4, 5];
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