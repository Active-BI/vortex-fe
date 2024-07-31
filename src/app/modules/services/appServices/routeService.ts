import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';

@Injectable({
    providedIn: 'root',
})
export class RouterService {
    private adaptandoRetornoParaGeracaoDeGruposDeRotas(grupos) {
        return grupos.map((grupo: any) => {
            const rolesDeTotasAsPaginas = grupo.Page.reduce(
                (acc: string[], page: { Page_Role: string[] }) => {
                    if (acc.find((a) => page.Page_Role.includes(a))) {
                        return acc;
                    }
                    acc.push(...page.Page_Role);
                    return acc;
                },
                []
            );
            grupo.children = grupo.Page
            return CreateRoutes.CollapsableRoute(grupo.id, grupo.title, grupo.icon,rolesDeTotasAsPaginas, grupo.Page);
        });
    }

    private geracaoDeRotasParaOFuse(gruposDeRotas: any[]): FuseNavigationItem[] { 
        return gruposDeRotas.map((grupo) => ({
            ...grupo,
            children: grupo.children.map((rota) => {
                let currPage;
                switch (rota.page_type) {
                    case 'page':
                        currPage = CreateRoutes.BasicRoute(
                            rota.Page_Role,
                            rota.id,
                            rota.title,
                            rota.link
                        );
                        break;
                    case 'report':
                        currPage = CreateRoutes.ReportRoute(
                            rota.Page_Role,
                            rota.id,
                            rota.title,
                            rota.link
                        );
                        break;
                    case 'dashboard':
                        currPage = CreateRoutes.DashboardRoute(
                            rota.Page_Role,
                            rota.id,
                            rota.title,
                            rota.link
                        );
                        break;
                    case 'web-page':
                        currPage = CreateRoutes.WebPageRoute(
                            rota.Page_Role,
                            rota.id,
                            rota.title,
                            rota.web_page_link
                        );
                        break;
                }
                return currPage;
            })
        })
        ).sort((a, b) => {
            if (a.title === 'Administrador') {
                return 1;
            }
            return -1;
        })
        .sort((a, b) => {
            if (a.title === 'Inicio') {
                return -1;
            }
            return 1;
        });
    }

    gerarRotasDaAplicacao(grupos: any[]): FuseNavigationItem[] {
        const gruposDeRotas = this.adaptandoRetornoParaGeracaoDeGruposDeRotas(grupos);
        return this.geracaoDeRotasParaOFuse(gruposDeRotas);
    }
}


class CreateRoutes {
    static BasicRoute(
        roles: string[] = [],
        id: string,
        title: string,
        link: string
    ): FuseNavigationItem {
        return {
            data: { roles },
            id,
            title,
            type: 'basic',
            link: link,
        };
    }

    static WebPageRoute(
        roles: string[] = [],
        id: string,
        title: string,
        web_page_link
    ): FuseNavigationItem {
        const link = (`view-web-page/${encodeURIComponent(web_page_link)}`);
        return {
            data: { roles },
            id,
            title,
            type: 'basic',
            link: link,
        };
    }

    static ReportRoute(
        roles: string[] = [],
        id: string,
        title: string,
        link: string
    ): FuseNavigationItem {
        return {
            data: { roles },
            id,
            title,
            type: 'basic',
            link: link,
        };
    }
    static DashboardRoute(
        roles: string[] = [],
        id: string,
        title: string,
        link: string
    ): FuseNavigationItem {
        return {
            data: { roles },
            id,
            title,
            type: 'basic',
            link: link,
        };
    }
    static CollapsableRoute(
        id: string,
        title: string,
        icon: string,
        roles,
        children = []
    ): FuseNavigationItem {
        return {
            data: { roles },
            id,
            title,
            type: 'collapsable',
            icon,
            children: children,
        };
    }
}