import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Example2Component } from 'app/modules/admin/example2/example2.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: Example2Component
    }
];

@NgModule({
    declarations: [
        Example2Component
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes)
    ]
})

export class Example2Module
{
}
