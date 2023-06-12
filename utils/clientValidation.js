const yup = require('yup');

const schema = yup.object().shape({
  //Le champ fullName ne doit pas dépasser 8 caractères.
  fullname: yup.string().max(8, 'Le champ fullName ne doit pas dépasser 8 caractères.').required(),
  //Le champ email doit être unique et de type email.
  email: yup.string().email('Le champ email doit être de type email.').required(),
  //Le champ telephone doit être de type Number et ne dépasse pas 8 chiffres.
  telephone: yup.number().typeError('Le champ telephone doit être de type Number.').max(99999999, 'Le champ telephone ne doit pas dépasser 8 chiffres.').required(),
});

module.exports = schema;
