export abstract class PaginaSimples {
  abstract deletar(id: string): any

  abstract dialogoEdicao(cliente: any): any

  abstract dialogoCriacao(): any
}

export abstract class Dialog {
  abstract requisicoes(): void

  abstract form: any;

  abstract onSubmit(): void
}
