const bcrypt = require('bcryptjs');

const helpers = {};
//recibe la contraseña tal cual se recibe
helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); //generamos un patron
  const hash = await bcrypt.hash(password, salt); //cifra la contraseña 
  return hash;
};


//comparar contraseñas
helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

module.exports = helpers;