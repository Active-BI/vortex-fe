import { FormBuilder, Validators } from '@angular/forms';
import { CnpjCpfValidator } from 'app/modules/services/utils/CnpjCpfValidator';
import * as _ from 'lodash';

const fb = new FormBuilder();
export const clienteForm = fb.group({
  id: [''],
  nome: ['', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ]],
  cnpj: [
    '',
    [Validators.required, CnpjCpfValidator.isValidCnpj()],
  ],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  empresa_id: ['', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ]],
  uf: ['', Validators.required],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  consultor_id: ['', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ]],
  contatos: fb.array([]),
  garagens: fb.array([]),
});

export const contatoForm = fb.group({
  nome: ['', [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(100),
]],
  cargo: ['', [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(100),
]],
  telefone: [
    '',
    [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ],
  ],
  email: [
    '',
    [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ],
  ],
  observacao: [''],
});
export const contatoLimpo = _.cloneDeep(contatoForm);
export const formLimpo = _.cloneDeep(clienteForm);
export const garagemForm = fb.group({
  cep: ['', Validators.required],
  nome: [
    '',
    [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(100),
],
  ],
  cnpj: [
    '',
    [
      Validators.required,
      CnpjCpfValidator.isValidCnpj(),
    ],
  ],
  endereco: ['', [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(100),
]],
  complemento: ['N/'],
  numero: ['', Validators.required],
  municipio: ['', [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(100),
]],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  uf_icms: ['', Validators.required],
});
export const garagemLimpa = _.cloneDeep(garagemForm);
