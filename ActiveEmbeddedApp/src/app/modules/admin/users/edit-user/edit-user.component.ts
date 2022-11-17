import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodicElement } from '../list-users/list-users.component';


const ordersData = [
  { id: 1, name: 'order 1' },
  { id: 2, name: 'order 2' },
  { id: 3, name: 'order 3' },
  { id: 4, name: 'order 4' }
];

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  form = this.fb.group({
    matricula: [''],
    nome: ['', Validators.required],
    perfil: ['', Validators.required],
    area: ['', Validators.required],
    visoes: new FormArray([]),
  })
  matricula: string
  ordersData = ordersData
  defaultUsers: PeriodicElement[] = []
  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,) {
    this.route.queryParams.subscribe(params => {
      this.matricula = params['matricula'];
    });
    this.defaultUsers = JSON.parse(localStorage.getItem('defaultUsers'))
    this.addCheckboxes();
  }
  private addCheckboxes() {
    this.ordersData.forEach(() => this.visoesFormArray.push(new FormControl(false)));
  }
  ngOnInit(): void {
    const user = this.defaultUsers.find((user: PeriodicElement) => user.matricula === this.matricula)
    console.log(user, this)
    this.form.patchValue({
      matricula: user.matricula,
      nome: user.nome,
      perfil: user.perfil,
      area: user.area,
      visoes: [...user.visoes]
    })
  }

  get visoesFormArray() {
    return this.form.controls.visoes as FormArray;
  }
  voltar(): void {
    this.router.navigate(['../usuarios'], {
      relativeTo: this.route,
    });
  }
  editar(): void {
    const index = this.defaultUsers.findIndex((user: PeriodicElement) => user.matricula === this.form.value.matricula)
    this.defaultUsers[index] = this.form.value as PeriodicElement
    localStorage.setItem('defaultUsers', JSON.stringify(this.defaultUsers))

    this.voltar()
  }
}
