import { AbstractControl, Validators } from '@angular/forms';
import { cpf, cnpj } from 'cpf-cnpj-validator';

export class CnpjCpfValidator {
  constructor() {}

  /**
   * Valida se o CPF é valido. Deve-se ser informado o cpf sem máscara.
   */
  static formatCpf(cpfValue: string): string {
      return cpfValue.replace(/[^0-9]+/g,'');
  }

  static formatCnpj(cnpjValue: string): string {
    return cnpjValue.replace(/[^0-9]+/g,'');
  }

  static isValidCpf() {
    return (control: AbstractControl): Validators => {
      const cpfValue = control.value;
      return cpf.isValid(cpfValue);
    };
  }

  static isValidCnpj() {
    return (control: AbstractControl): Validators => {
      const cnpjValue = control.value;
      return cnpj.isValid(cnpjValue);
    };
  }
}
