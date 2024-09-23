import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'app/modules/services/auth/auth.service';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit, OnDestroy {
    user: any;
    caixasDeTexto: any = [
        {
            image: '/assets/images/favicon.icon.webp',
            titulo: 'CONSULTORIA',
            texto: 'A Active BI é uma consultoria especializada em Data Intelligence. Com uma equipe altamente qualificada, entregamos soluções de alta qualidade. Nossas parcerias são estratégicas e duradouras, sempre pautadas ela flexibilidade, foco, simplicidade e agilidade quedefinem nosso DNA.',
        },
        {
            image: '/assets/images/favicon.icon.webp',
            titulo: 'OUTSOURCING',
            texto: 'Selecionamos cuidadosamente os profissionais ideais para atender às suas necessidades. Com uma análise criteriosa do perfil do cliente e das demandas do projeto, garantimos a alocação de recursos que realmentefazem a diferença.',
        },
        {
            image: '/assets/images/favicon.icon.webp',
            titulo: 'POWER BI',
            texto: 'Somos referência no ecossistema do Power BI, desenvolvendo relatórios e integrações de alta complexidade para as maiores empresas do Brasil e do exterior. Oferecemos um catálogo completo de serviços incluindo implantação, migração, desenvolvimento, monitoramento, governança e suporte',
        },
        {
            image: '/assets/images/favicon.icon.webp',
            titulo: 'ENGENHARIA DE DADOS',
            texto: 'Na Active BI, apoiamos sua empresa em todas as etapas da engenharia de dados. Desde a implementação de Data Lakes e Data Warehouses até o design de arquiteturas modernas como Lakehouse e integrações em múltiplas nuvens.',
        },
        {
            image: '/assets/images/favicon.icon.webp',
            titulo: 'DATAVIZ',
            texto: ' Apoiamos sua empresa com diversas soluções de Data Visualization e migração de plataformas, indo além do Power BI. Com expertise em Tableau, Qlik, Looker, Microstrategy e outras ferramentas líderes demercado',
        },
        {
            image: '/assets/images/favicon.icon.webp',
            titulo: 'TREINAMENTOS',
            texto: 'Nossos treinamentos são personalizados e focados nas necessidades reais do seu negócio. Além de capacitar sua equipe nas ferramentas de BI e dados, ensinamos as melhores práticas para tratar seus dados, um dos principais ativos da sua empresa, com segurança e rigor.',
        },
    ];
    constructor(private authService: AuthService) {}
    ngOnDestroy(): void {}
    ngOnInit(): void {
        this.user = this.authService.GetUser();
        console.log(this.user);
    }
}
