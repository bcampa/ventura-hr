<template>
  <tr>
    <td valign="top">
      <p align="center">
        <span class="font-size-2"><b>Bem Vindo {{ currentUser.name }}!</b></span>
      </p>
      <table
        border="1"
        cellpadding="5"
        cellspacing="0"
        style="border-collapse: collapse"
        bordercolor="#111111"
        width="100%"
        id="AutoNumber3"
      >
        <tr>
          <td width="100%" colspan="2">
            <p align="center">
              <span class="font-size-2">
                <a href="09_04_Alterar_Usuario.html"
                  >Alterar Dados da Sua Conta
                </a>
                <span v-if="currentUser.type === userTypes.corporation">
                  |
                  <router-link :to="'/offers/create'">Publicar Uma Nova Vaga</router-link>
                </span>
              </span>
            </p>
          </td>
        </tr>
        <tr>
          <td width="50%" valign="top">
            <p align="center">
              <b><span class="font-size-2">Mensagens do Sistema:</span></b>
            </p>
            <p>
              <span class="font-size-2" v-if="currentUser.type === userTypes.corporation">
                Atenção: entre em contato com a administração para resolver pendências de pagamento
              </span>
              <span class="font-size-2" v-if="currentUser.type === userTypes.applicant">
                Lembre-se que é possível recomendar uma vaga aos seus amigos - basta informar os seus emais
              </span>
            </p>
          </td>
          <td width="50%" valign="top">
            <p align="center">
              <b>
                <span class="font-size-2" v-if="currentUser.type === userTypes.corporation">
                  Suas Vagas Publicadas:
                </span>
                <span class="font-size-2" v-if="currentUser.type === userTypes.applicant">
                  Suas Vagas Respondidas:
                </span>
              </b>
            </p>
            <table
              border="1"
              cellpadding="0"
              cellspacing="0"
              style="border-collapse: collapse"
              bordercolor="#111111"
              width="100%"
              id="AutoNumber4"
              v-if="this.userOffersFilterResponse?.items.length > 0"
            >
              <tr>
                <th width="200"><span class="font-size-2">Cargo</span></th>
                <th width="100"><span class="font-size-2">Data Fim</span></th>
                <th width="1">&nbsp;</th>
              </tr>
              <tr v-for="jobOffer in userOffersFilterResponse.items" :key="jobOffer.id">
                <td width="200"><span class="font-size-2">{{ jobOffer.position }}</span></td>
                <td width="100" align="center">
                  <span class="font-size-2">{{ formatDate(jobOffer.deadline) }}</span>
                </td>
                <td width="1" align="center">
                  <span class="font-size-2">
                    <router-link :to="'/job-offer/' + jobOffer.id">
                      <span class="material-icons">remove_red_eye</span>
                    </router-link>
                  </span>
                </td>
              </tr>
            </table>
            <p align="center" v-if="this.userOffersFilterResponse?.items.length === 0">
              <span 
                class="font-size-2"
                v-if="currentUser.type === userTypes.corporation"
              >
                Sua empresa ainda não publicou nenhuma vaga.
              </span>
              <span 
                class="font-size-2"
                v-if="currentUser.type === userTypes.applicant"
              >
                Você ainda não se candidatou a nenhuma vaga.
              </span>
            </p>
          </td>
        </tr>
        <tr>
          <td width="100%" colspan="2">
            <p align="center">
              <b><span class="font-size-2">Consulta de Vagas Disponíveis:</span></b>
            </p>
            <div class="center-horizontally">
              <table
                width="100%"
                border="1"
                cellpadding="3"
                cellspacing="0"
                style="border-collapse: collapse"
                bordercolor="#111111"
                id="AutoNumber6"
              >
                <tr>
                  <td>
                    <span class="font-size-2">cargo</span>
                  </td>
                  <td><input type="text" name="pesquisa_1" size="60" v-model="searchFilter.position"/></td>
                </tr>
                <tr>
                  <td>
                    <span class="font-size-2">descrição</span>
                  </td>
                  <td><input type="text" name="pesquisa_2" size="60" v-model="searchFilter.description"/></td>
                </tr>
                <tr>
                  <td>
                    <span class="font-size-2">cidade</span>
                  </td>
                  <td><input type="text" name="pesquisa_3" size="60" v-model="searchFilter.city"/></td>
                </tr>
                <tr>
                  <td colspan="2">
                    <p align="center">
                      <button type="button" @click="doNewSearch">Pesquisar Vagas</button>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" v-if="searchFilterResponse">
                    <p align="center" style="margin-top: 0; margin-bottom: 0">
                      <span class="font-size-2">
                        <b>
                          {{ searchFilterResponse.totalEntries }} Vagas encontradas
                        </b>
                        <span v-if="searchFilterResponse?.items?.length > 0">
                          , exibindo de {{ this.currentMinRow }} a {{ this.currentMaxRow }}
                        </span>
                      </span>
                    </p>
                    <p align="center" style="margin-top: 0; margin-bottom: 0" v-if="searchFilterResponse?.items?.length > 0">
                      <span class="font-size-2">
                        [<a href="javascript:void(0);" @click="changePage(this.firstPage)">Início</a> | <a href="javascript:void(0);" @click="changePage(this.previousPage)"> Anterior</a>]
                        <span
                          href="javascript:void(0);"
                          v-for="page in this.pageRange"
                          :key="page"
                          @click="changePage(page)"
                          style="margin: 0 0.2em;"
                        >
                          <a href="javascript:void(0);" v-if="page != this.searchFilterResponse.filter.page">{{ page + 1 }}</a><span v-else>{{ page + 1 }}</span>
                        </span>
                        [<a href="javascript:void(0);" @click="changePage(this.nextPage)">Próxima</a> | <a href="javascript:void(0);" @click="changePage(this.lastPage)">Fim</a>]</span
                      >
                    </p>
                    <p align="left" style="margin-top: 0; margin-bottom: 0">
                      &nbsp;
                    </p>
                    <table
                      border="1"
                      cellpadding="0"
                      cellspacing="0"
                      style="border-collapse: collapse"
                      bordercolor="#111111"
                      width="100%"
                      id="AutoNumber7"
                      v-if="searchFilterResponse?.items?.length > 0"
                    >
                      <tr>
                        <th width="27%"><span class="font-size-2">Cargo</span></th>
                        <th width="52%"><span class="font-size-2">Descrição</span></th>
                        <th width="21%"><span class="font-size-2">Cidade</span></th>
                        <th width="21%">&nbsp;</th>
                      </tr>
                      <tr v-for="jobOffer in searchFilterResponse.items" :key="jobOffer.id">
                        <td width="27%">
                          <span class="font-size-2">{{ jobOffer.position }}</span>
                        </td>
                        <td width="52%">
                          {{ jobOffer.description }}
                        </td>
                        <td width="21%">
                          <span class="font-size-2">{{ jobOffer.city }}</span>
                        </td>
                        <td width="21%">
                          <span class="font-size-2">
                            <router-link :to="'/job-offer/' + jobOffer.id">
                              <span class="material-icons">remove_red_eye</span>
                            </router-link>
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</template>

<script src="./offersPage.js"></script>

<style>
</style>