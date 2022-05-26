import requests from '../../requests'
import { userTypes } from '../../constants'

export default {
  name: "OffersPage",
  data: () => ({
    searchFilter: {
      position: "",
      description: "",
      city: "",
      page: 0,
      itemsPerPage: 5,
      paginated: true,
      sortingProperty: "Id",
      sortingDirection: "DESC"
    },
    userOffersFilter: {
      page: 0,
      itemsPerPage: 5,
      paginated: true,
      sortingProperty: "Id",
      sortingDirection: "DESC"
    },
    searchFilterResponse: null,
    userOffersFilterResponse : null,
  }),
  methods: {
    async executeSearchFilter() {
      const response = await requests.jobOffers.get(this.searchFilter);
      if (response.ok) {
        this.searchFilterResponse = await response.json();
      }
      else {
        alert('Ocorreu um erro ao tentar carregar as vagas');
      }
    },
    async executeUserOffersFilter() {
      const response = await requests.jobOffers.get(this.userOffersFilter);
      if (response.ok) {
        this.userOffersFilterResponse = await response.json();
      }
      else {
        alert('Ocorreu um erro ao tentar carregar as vagas');
      }
    },
    doNewSearch() {
      this.searchFilter.page = 0;
      this.executeSearchFilter();
    },
    changePage(number) {
      number = Math.min(number, this.searchFilterResponse.totalPages - 1);
      this.searchFilter.page = number;
      this.executeSearchFilter();
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    currentMinRow() { 
      if (this.searchFilterResponse.totalEntries == 0) {
        return 0;
      }
      else {
        return (this.searchFilterResponse.filter.page * this.searchFilterResponse.filter.itemsPerPage) + 1;
      }
    },
    currentMaxRow() { return this.currentMinRow + this.searchFilterResponse.items.length - 1 },
    firstPage() {
      return 0;
    },
    previousPage() {
      return Math.max(this.currentPage - 1, this.firstPage);
    },
    currentPage() {
      return this.searchFilterResponse.filter.page;
    },
    nextPage() {
      return Math.min(this.currentPage + 1, this.lastPage);
    },
    lastPage() {
      return this.searchFilterResponse.totalPages - 1;
    },
    pageRange() {
      const startingPoint = Math.max((Math.min(this.searchFilterResponse.filter.page, this.searchFilterResponse.totalPages - 5)), 0);
      const endingPoint = Math.min((this.searchFilterResponse.filter.page + 2), this.searchFilterResponse.totalPages);
      return Array.from({ length: (endingPoint - startingPoint) }, (_, i) => startingPoint + i);
    }
  },
  created: async function() {
    this.userTypes = userTypes;
    if (this.currentUser.tipo === userTypes.applicant) {
      this.userOffersFilter.applicantId = this.currentUser.id;
    }
    else if (this.currentUser.tipo === userTypes.corporation) {
      this.userOffersFilter.publisherId = this.currentUser.empresaId;
    }
    await this.executeSearchFilter();
    await this.executeUserOffersFilter();
  },
};