export interface IDataCustomers {
  idclientes: string;
  name: string;
  cpf: string;
  birthdate: string;
  phoneOne: string;
  phoneTwo: string;
}

export interface IDataIR {
  idrestituition: string;
  customer_cpf: string;
  dateRegister: string;
  dataCode: boolean;
  dataText: string;
  dataValor: string;
}

export interface IListCpf {
  cpf: string;
}

export interface IDataService {
  service_id: string;
  name: string;
  cpf: string;
  date_send: string;
  charged: string;
  received: string;
  date_received: string;
  onlyyear: string;
  obs: string;
}

export interface IListYear {
  ano: string | null;
}

export interface IRestituition {
  autorizacao: IAutorizacao;
  servico: string;
  idServico: string;
  versao: string;
  dados: IDados[];
}

export interface IAutorizacao {
  token: string;
  dataHoraRegistro: string;
  titular: string;
  destinatario: string;
  avisoLegal: string;
}

export interface IDados {
  codigo: string;
  texto: string;
  valor: string;
}

export interface IAuth {
  autorizacoes: IAutorizacoes[];
}

export interface IAutorizacoes {
  ni: string;
  token: string;
  status: string;
  dataHoraStatus: string;
  dataHoraVigenciaInicial: string;
  dataHoraVigenciaFinal: string;
  hashAssinadoPadraoIcpBrasil: string;
  hashAssinadoPadraoIcpBrasilStatus: string;
  idServico: string;
  versao: string;
  avisoLegal: string;
}
