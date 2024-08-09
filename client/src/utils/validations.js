export const validateForm = (formData) => {
  const errors = {};

  if (!formData.name) {
    errors.name = "El nombre es requerido";
  }

  if (!formData.lastName) {
    errors.lastName = "El apellido es requerido";
  }

  if (!formData.age) {
    errors.age = "La edad es requerida";
  }

  if (!formData.type) {
    errors.type = "El tipo de consulta es requerido";
  }

  if (!formData.phone) {
    errors.phone = "El teléfono es requerido";
  }

  if (!formData.email) {
    errors.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "El email es inválido";
  }

  return errors;
};