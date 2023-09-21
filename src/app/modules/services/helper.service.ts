import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HelperService {
    constructor(private http: HttpClient) {}
    async getIcons() {
        const res = await fetch(
            `https://fonts.google.com/metadata/icons?key=material_symbols&incomplete=true`
        );

        const resMap = await res.json();
        // .map((icon) => icon.name);
        console.log(resMap);
    }
}
