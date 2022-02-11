export function required(value) {
  if (!value) {
    return { error: true, hint: "O campo é obrigatório." };
  }
  return { error: false, hint: null };
}
export function minLength(value, length) {
  if (value.length < length) {
    return {
      error: true,
      hint: `O campo precisa de no mínimo ${length} caracteres.`,
    };
  }
  return { error: false, hint: null };
}
export function onlyNumbers() {}
export function cpf(value) {
  let soma = 0;
  let resto;
  let inputCPF = value;

  if (inputCPF == "00000000000")
    return { error: true, hint: `O campo é inválido.` };
  for (const i = 1; i <= 9; i++)
    soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(inputCPF.substring(9, 10)))
    return { error: true, hint: `O campo é inválido.` };

  soma = 0;
  for (const i = 1; i <= 10; i++)
    soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(inputCPF.substring(10, 11)))
    return { error: true, hint: `O campo é inválido.` };
  return { error: false, hint: null };
}
