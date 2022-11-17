import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  form = this.fb.group({
    maricula: [''],
    nome: ['', Validators.required],
    perfil: ['', Validators.required],
    area: ['', Validators.required],
    opcoes: ['', Validators.required],
  })
  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
  }
  voltar(): void {
    this.router.navigate(['../usuarios'], {
      relativeTo: this.route,
    });
  }
}
