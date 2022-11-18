import { Component, OnInit } from '@angular/core';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PeriodicElement } from '../list-users/list-users.component';
import { UsuariosService } from 'app/modules/services/usuarios';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent extends EditUserComponent implements OnInit{
    value = '';
    constructor(
      fb: FormBuilder,
      router: Router,
      route: ActivatedRoute,
      toastr: ToastrService,
      private toast: ToastrService,
      usuariosService: UsuariosService,
      private usuarioService: UsuariosService,
      )
      {
    super(fb, router, route, toastr, usuariosService);
  }

  override ngOnInit(): void {
  }

  criar(): void {
    if (this.form.validator) {
      this.form.patchValue({ matricula: Math.round(Math.random() * 20000).toString()})
      this.defaultUsers.push(this.form.value as PeriodicElement)
      this.usuarioService.postUsuario(this.defaultUsers)
      this.toast.success("Usuário Criado com Sucesso")
      this.voltar()
    } else {
      this.form.markAllAsTouched()
    }
  }
}
