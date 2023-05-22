import { Injectable } from '@angular/core';

export const listRoles = [
    {
        name: 'User',
        id: 'ca21241b-a37d-4e6f-bbb6-26643d3cdd99',
    },
    {
        name: 'Admin',
        id: '6a203390-8389-49ca-aa0e-6a14ba7815bc',
    },
    {
        name: 'Regional',
        id: '24ec4e25-9431-478b-9694-bf9159e6fcc4',
    },
    {
        name: 'Nacional',
        id: 'a8296030-c28f-45cb-9c8b-444e05218605',
    },
];

@Injectable({
    providedIn: 'root',
})
export class RolesService {
    constructor() {}
}
