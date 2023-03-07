import { Injectable } from '@angular/core';

export const listRoles = [{
  name:'User',
  id: 'ca21241b-a37d-4e6f-bbb6-26643d3cdd99'
},
{
name: 'Admin',
id: '6a203390-8389-49ca-aa0e-6a14ba7815bc'

}]

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor() { }
}
