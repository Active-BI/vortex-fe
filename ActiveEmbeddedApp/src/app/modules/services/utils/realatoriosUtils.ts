const removeInitialSpace = (w: any) => {
  const nw = w?.cnpj.split('')
  const dots = ['.', '-', '/']
  if (nw[0] === '0') nw.shift()
  return nw.filter((w: any) => !dots.includes(w)).join('')
}

export const getBasePriceQuery = (Clients: any[], filters: any): string => {
  const findCliente = Clients?.find(
    (cliente) => cliente.nome === filters.clientes
    )
    const start = filters.start
    const end = filters.end
  if (findCliente?.cnpj) {
    const cnpj = removeInitialSpace(findCliente)
    const query = `limit=0&offset=0&cnpjCpfComprador=${cnpj}&nomeProduto=${filters.produto}&inicioDataEmissao=${start}&fimDataEmissao=${end}`
    return query
  }
  return ''
}
