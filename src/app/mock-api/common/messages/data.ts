/* eslint-disable */
import * as moment from 'moment';

export const messages = [
    {
        id: '832276cc-c5e9-4fcc-8e23-d38e2e267bc9',
        image: 'assets/images/avatars/male-01.jpg',
        title: 'ATUALIZAÇÃO',
        description: 'Painel de vendas atualizado',
        time: moment().subtract(25, 'minutes').toISOString(), // 25 minutes ago
        read: false,
    },
    {
        id: '608b4479-a3ac-4e26-8675-3609c52aca58',
        image: 'assets/images/avatars/male-04.jpg',
        title: 'SEBRAE-AC',
        description: 'Vulnerabilidades acima de 10k',
        time: moment().subtract(50, 'minutes').toISOString(), // 50 minutes ago
        read: false,
    },
    {
        id: '22148c0c-d788-4d49-9467-447677d11b76',
        image: 'assets/images/avatars/female-01.jpg',
        title: 'GESTÃO DE USUÁRIOS',
        description: 'Novo usuário cadastrado no sistema',
        time: moment().subtract(3, 'hours').toISOString(), // 3 hours ago
        read: true,
        link: '/dashboards/project',
        useRouter: true,
    },
];
