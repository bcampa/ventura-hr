export default {
  dateBR(date) {
    if (!date) {
      return null;
    }

    return new Date(date).toLocaleDateString('pt-BR');
  }
};