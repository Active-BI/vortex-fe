/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { MatPaginatorIntl } from '@angular/material/paginator';

const portugueseRangeLabel = (
    page: number,
    pageSize: number,
    length: number
): any => {
    if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    const endIndex =
        startIndex < length
            ? Math.min(startIndex + pageSize, length)
            : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} de ${length}`;
};

export function getPortuguesePaginatorIntl(): any {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'Itens por página:';
    paginatorIntl.nextPageLabel = 'Página seguinte';
    paginatorIntl.previousPageLabel = 'Página anterior';
    paginatorIntl.getRangeLabel = portugueseRangeLabel;

    return paginatorIntl;
}

// Baseado neste código: https://stackblitz.com/edit/angular-5mgfxh-9pusym?file=app%2Fdutch-paginator-intl.ts
