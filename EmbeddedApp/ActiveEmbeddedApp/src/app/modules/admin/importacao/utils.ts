
interface ItemInterface {
  id: number;
  bairroDestComprador: string;
  bairroEmitente: string;
  cepDestComprador: string;
  codProduto: string;
}

export const isValidData = (json: ItemInterface[]): boolean => {
  const includeOnTable = [
    'nfe',
    'bairroDestComprador',
    'bairroEmitente',
    'cepDestComprador',
    'codProduto'
  ];
  const ifIncludes = includeOnTable.map(i => Object.keys(json[0]).includes(i));
  if (ifIncludes.some(i => i === false)) {
    return false;
  }
  return true;
};

export const convertDateForImport = (json: any[]): any => {
  const dataJson: any = json.map(x => ({ ...x, dataEmissao: x.dataEmissao.toISOString() }));

  return dataJson;
};
