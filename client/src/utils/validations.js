export const validateForm = (formData) => {
  const errors = {};

  if(!formData.name) {
    errors.name = "El nombre es requerido";
  }

  if(!formData.lastname) {
    errors.lastName = "El apellido es requerido";
  }

  if(!formData.age) {
    errors.age = "La edad es requerida";
  }

  if(!formData.service) {
    errors.type = "El tipo de consulta es requerido";
  }

  if(!formData.phone) {
    errors.phone = "El teléfono es requerido";
  }

  return errors;
};

export const validateLogin = (formData) => {
  const errors = {};

  if(!formData.email) {
    errors.email = "El email es requerido";
  } else if(!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "El email es inválido";
  }

  if (!formData.password) {
    errors.password = "La contraseña es requerida";
  }
  // else if (formData.password.length < 8) {
  //   errors.password = "La contraseña debe tener al menos 8 caracteres";
  // } else if (!/[A-Z]/.test(formData.password)) {
  //   errors.password = "La contraseña debe tener al menos una letra mayúscula";
  // } else if (!/[a-z]/.test(formData.password)) {
  //   errors.password = "La contraseña debe tener al menos una letra minúscula";
  // } else if (!/[0-9]/.test(formData.password)) {
  //   errors.password = "La contraseña debe tener al menos un número";
  // }
  
  return errors;
}

export const validateCreateService = (formData) => {
  const errors = {};

  if(!formData.name) {
    errors.name = "El nombre es requerido";
  }

  if(!formData.price) {
    errors.price = "El precio es requerido";
  }

  if(!formData.disclaimers) {
    errors.disclaimers = "Los disclaimers son requeridos";
  }

  // if(formData.features.length === 0) {
  //   errors.features = "Al menos un feature es requerido";
  // }
  if(formData.features.length === 0 || formData.features.every(feature => feature.trim() === "")) {
    errors.features = "Al menos un feature válido es requerido";
  }

  return errors;
};

export const validateCreateFuneral = (formData) => {
  const errors = {};

  if(!formData.name) {
    errors.name = "El nombre es requerido";
  }

  return errors;
};