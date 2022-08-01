export default class DataFormater {
  static moneyFormat(number) {
    if (number) {
      return `R$ ${number.toFixed(2)}`.replace(".", ",");
    }
  }
  static timeRangeFormat(number) {
    if (number) {
      if (number > 59) {
        const modulo = number % 60;
        return `${number / 60 - modulo} horas e ${modulo} minutos`;
      } else {
        return `${number} minutos`;
      }
    }
    return `none`;
  }
}
