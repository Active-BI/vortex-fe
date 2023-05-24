import { Component, OnInit } from '@angular/core';
import { MenuService } from 'app/modules/services/menu.service';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
    constructor(private menuService: MenuService) {
        this.menuService.getAllMenus().subscribe((res) => console.log(res));
    }
    ngOnInit(): void {}
}
