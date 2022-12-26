import { Injectable } from '@angular/core';
import {EventEmitter} from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

export interface RouteInfo {
  path: string
  title: string
  longTitle?: string
  icon: string
  class: string
  subItems?: RouteInfo[],
  context?: string
}

export interface MenuOption {
  link: string
  label: string
  levelAccess: string[]
}
export const ROUTES: RouteInfo[] = [
  // Sentinelone
  // Trend
  // Servicenow
  // Archer
  // Forcepoint
  // Big IP F5
  {
    path: "vulnerabilidades",
    title: "Gestão de Vulnerabilidades",
    longTitle: "Gestão de Vulnerabilidades",
    icon: "policy",
    class: "",
    subItems: [],
    context: "user"
  },
  {
    path: "correlacionamento-logs",
    title: "Correlacionamento de Logs",
    longTitle: "Correlacionamento de Logs",
    icon: "data_thresholding",
    class: "",
    subItems: [],
    context: "user"
  },
  {
    path: "deteccao-resp-endpoint",
    title: "Detecção e Resposta em Endpoints",
    longTitle: "Detecção e Resposta em Endpoints",
    icon: "important_devices",
    class: "",
    subItems: [],
    context: "user"
  },
  {
    path: "resposta-incidentes",
    title: "Resposta aos Incidentes",
    longTitle: "Resposta aos Incidentes",
    icon: "home_repair_service",
    class: "",
    subItems: [],
    context: "user"
  },
  {
    path: "operacoes-e-requisicoes",
    title: "Operações e Requisições",
    longTitle: "Operações e Requisições",
    icon: "manage_accounts",
    class: "",
    subItems: [],
    context: "user"
  },
  // {
  //   path: "4",
  //   title: "Governança, Risco e Conformidades",
  //   longTitle: "Governança, Risco e Conformidade",
  //   icon: "assured_workload",
  //   class: "",
  //   subItems: [],
  //   context: "user"
  // },
  {

    path: "mapeamento-dados-sensiveis",
    title: "Mapeamento de Dados Sensíveis",
    longTitle: "Mapeamento de Dados Sensíveis",
    icon: "privacy_tip",
    class: "",
    subItems: [],
    context: "user"
  },
  {
    path: "gestao-consentimento-cookies",
    title: "Gestão de Consentimento e Cookies",
    longTitle: "Gestão de Consentimento e Cookies",
    icon: "cookie",
    class: "",
    subItems: [],
    context: "user"
  },
  {
    path: "6",
    title: "Controle de Acesso à Rede",
    longTitle: "Controle de Acesso à Rede",
    icon: "network_locked",
    class: "",
    subItems: [],
    context: "user"
  },
  // {
  //   path: "7",
  //   title: "Continuidade de Negócio                 ",
  //   longTitle: "Continuidade de Negócio",
  //   icon: "autorenew",
  //   class: "",
  //   subItems: [],
  // },
  {
    path: "prevencao-vazamentos-de-dados",
    title: "Prevenção Contra Vazamento de Dados",
    longTitle: "Prevenção Contra Vazamento de Dados",
    icon: "security",
    class: "",
    subItems: [],
    context: "user"
  },
  {
    path: "distribuicao-aplicacoes-web",
    title: "Distribuição de Aplicações WEB",
    longTitle: "Distribuição de Aplicações WEB",
    icon: "settings_applications",
    class: "",
    subItems: [],
    context: "user"
  },
  {
    path: "soc-service",
    title: "Soc-Services",
    longTitle: "Painel Soc-Services",
    icon: "insights",
    class: "",
    subItems: [],
    context: "user"
  },

  // *********** Itens do menu adminstrativo ***********//
  {
    path: "admin",
    title: "Usuários",
    longTitle: "Listagem de Usuarios",
    icon: "group",
    class: "",
    subItems: [],
    context: "admin"
  },
  {
    path: "visoes",
    title: "Visões",
    longTitle: "Visões",
    icon: "visibility",
    class: "",
    subItems: [],
    context: "admin"
  },
  {
    path: "menu-acesso",
    title: "Menus de Acesso",
    longTitle: "Menus de Acesso",
    icon: "article",
    class: "",
    subItems: [],
    context: "admin"
  },
  {
    path: "cliente",
    title: "Clientes",
    longTitle: "Clientes",
    icon: "badge",
    class: "",
    subItems: [],
    context: "admin"
  },
];

export const OptionsMenuUser: MenuOption[] = [
  {
    link: 'admin',
    label: 'Administrativo',
    levelAccess: ['admin']
  },
  {
    link: '/dashboard',
    label: 'Painéis',
    levelAccess: ['admin','user']
  }

]


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  menuContext: 'dashboard' | 'admin' | 'user' = 'dashboard'

  userMenuContext: any;

  menuContextChanged = new ReplaySubject<string>();

  userMenuContextChanged = new EventEmitter<any>();

  changeContextMenu(context: 'dashboard' | 'admin' | 'user'){
    this.menuContext = context;

    this.menuContextChanged.next(context);

  }

  setUserMenuContext(userMenu: any) {
    this.userMenuContext = userMenu;
    this.userMenuContextChanged.emit(userMenu);

  }



}
