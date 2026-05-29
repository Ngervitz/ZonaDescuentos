export const DEPARTMENTS = [
  "Montevideo",
  "Canelones",
  "Maldonado",
  "Rocha",
  "Colonia",
  "San José",
  "Florida",
  "Lavalleja",
  "Durazno",
  "Flores",
  "Soriano",
  "Río Negro",
  "Paysandú",
  "Salto",
  "Artigas",
  "Rivera",
  "Tacuarembó",
  "Cerro Largo",
  "Treinta y Tres",
];

export const EMPLOYMENT_OPTIONS = [
  { value: "dependiente", label: "Dependiente" },
  { value: "independiente", label: "Independiente" },
  { value: "jubilado", label: "Jubilado / pensionista" },
  { value: "otro", label: "Otro" },
];

export function validateWizardStep(step, form) {
  const errors = {};

  if (step === 1) {
    if (form.name.trim().length < 2) {
      errors.name = "Ingresá tu nombre.";
    }
    if (!/^09\d{7}$/.test(form.phone.replace(/\s/g, ""))) {
      errors.phone = "Ingresá un celular uruguayo válido. Ej: 099123456";
    }
  }

  if (step === 2) {
    if (!/^\d{7,8}$/.test(form.document.replace(/\D/g, ""))) {
      errors.document = "Ingresá una cédula válida.";
    }
  }

  if (step === 3) {
    if (!form.income || Number(form.income) < 1) {
      errors.income = "Ingresá tu ingreso mensual.";
    }
    if (!form.employment) {
      errors.employment = "Seleccioná tu situación laboral.";
    }
    if (!form.department) {
      errors.department = "Seleccioná tu departamento.";
    }
  }

  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
