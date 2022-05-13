const userTypes = {
  admin: 1,
  corporation: 2,
  applicant: 3,
};

const profiles = new Map();
profiles.set(1, 'Desejável');
profiles.set(2, 'Diferencial');
profiles.set(3, 'Relevante');
profiles.set(4, 'Muito Relevante');
profiles.set(5, 'Obrigatório');

const contractTypes = new Map();
contractTypes.set(1, 'CLT');
contractTypes.set(2, 'Pessoa Jurídica');
contractTypes.set(3, 'Autônomo');

export { userTypes, profiles, contractTypes };