import { group } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

const key = 'AIzaSyBh5kIKDAOuK5VqAWfVeVenFFK9hg6r1vs';
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
