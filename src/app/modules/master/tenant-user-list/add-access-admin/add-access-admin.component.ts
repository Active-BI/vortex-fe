import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageMasterService } from 'app/modules/services/page-master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-access-admin',
  templateUrl: './add-access-admin.component.html',
  styleUrls: ['./add-access-admin.component.scss']
})
export class AddAccessAdminComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private pageMasterService: PageMasterService
  ) {
    console.log(data)
   }
   form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]]
   })

  ngOnInit(): void {
  }
  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched()
      this.toastr.error('Email Inválido')
    }
    this.pageMasterService
        .PostAdminUsersByTenantId(
           this.data.tenant_id,
           this.form.value
        )
        .subscribe((e) => {
            this.data.data();
        }, (error) => {
          this.toastr.error('Erro ao cadastrar usuário')
        });
}
}
