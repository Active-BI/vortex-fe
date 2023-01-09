import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/modules/services/admin.service';
import { listRoles } from 'app/modules/services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { PeriodicElement } from '../list-users/list-users.component';
import { ordersData } from '../usersUtils';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  myControl = new FormControl('');

  form = this.fb.group({
    id: [''],
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    emailContato: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    identificacao: ['', [Validators.required]],
    perfil: ['', [Validators.required]],
    perfilId: [''],
    visions: [[]],
    menus: [[]],
  })
  panelOpenState = false
  id: string
  ordersData = ordersData
  user: any

  visoes = []

  listRoles = listRoles
  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private adminSrv: AdminService) {

  this.id = this.route.snapshot.paramMap.get("id")
  }
  ngOnInit(): void {
    this.form.controls.email.disable()
    this.adminSrv.getUserById(this.id).subscribe((e : any) => {
      this.user = e
      console.log(this.user.userVisions.map(x => x.vision.name))
      this.form.patchValue({
        id: this.user.id,
        nome: this.user.nome,
        email: this.user.email,
        emailContato: this.user.emailContato,
        identificacao: this.user.identificacao,
        perfil: this.user.perfil,
        visions:  this.user.userVisions.map(x => x.vision.name),
        menus: []
      })

    })

    this.adminSrv.geVisions().subscribe((e : any) => {
      e = e.sort((a,b)=> {
        a = a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        b = b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        // a must be equal to b
        return 0;
      })
      this.visoes = e
      this.filteredVisions = e
    })
  
  }
  filteredVisions = []
  filterVisions(e) {
    this.filteredVisions =this.visoes.filter((v) => v.name.toUpperCase().includes(e.toUpperCase()))
  }
  get visoesFormArray() {
    return this.form.controls.visions as FormControl;
  }
  voltar(): void {
    this.router.navigate(['app/usuarios'])
  }

  redirectToEdit(id) {
    this.router.navigate([`app/usuarios-editar/${id}`])
  }
  editar(): void {
    if (this.form.valid && this.myControl.valid) {
      const payload = this.form.value
      this.adminSrv.updateUser(this.form.value as PeriodicElement).subscribe((e => {
        this.toastr.success("Editado com Sucesso")
        this.voltar()
      }))
    } else {
      this.form.markAllAsTouched()
    }
  }
}
