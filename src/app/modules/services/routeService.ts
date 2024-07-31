import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { CreateRoutes } from 'app/mock-api/common/navigation/data';

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
            return {
                ...grupo,
                roles: rolesDeTotasAsPaginas,
            };
        });
    }

    private geracaoDeRotasParaOFuse(gruposDeRotas: any[]): FuseNavigationItem[] { 
        return gruposDeRotas.map((grupo) => ({
            ...grupo,
            children: grupo.Page.map((rota) => {
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
        )
    }

    gerarRotasDaAplicacao(grupos: any[]): FuseNavigationItem[] {
        const gruposDeRotas = this.adaptandoRetornoParaGeracaoDeGruposDeRotas(grupos);
        return this.geracaoDeRotasParaOFuse(gruposDeRotas);
    }
}
