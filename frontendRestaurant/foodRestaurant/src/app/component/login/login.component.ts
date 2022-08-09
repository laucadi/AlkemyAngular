import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formValue!: FormGroup;
  public mensaje_ok: any;
  public mensaje_error: any;
  public correo: any;
  contrasena!: string;
  error!: string;
  public token: any;
  public id: any;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.camposLogin();
  }

  camposLogin() {
    this.formValue = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  loginSubmit() {
    //console.log(data);
    this.usuarioService.login(this.formValue.value).subscribe((response) => {
      if (response.mensaje == 'correo Incorrecto') {
        Swal.fire({
          icon: 'error',
          text: 'El correo no es correcto!',
          confirmButtonColor: '#efa13f',
        });
      } else if (response.mensaje == 'Contrasena incorrecta') {
        Swal.fire({
          icon: 'error',
          text: 'La contrasena no es correcta!',
          confirmButtonColor: '#efa13f',
        });
      } else {
        Swal.fire({
          title: 'Inicio de sesión correcto!',
          text: 'Bienvenido!',
          icon: 'success',
          confirmButtonColor: '#efa13f',
        });
        this.token = response.token;
        this.id = response.id;
        localStorage.setItem('token', this.token);
        localStorage.setItem('id', this.id);

        this.usuarioService.login(this.formValue.value).subscribe(
          (response) => {
            console.log(response);
            this.router.navigate(['landing']);
          },
          (error) => {
            console.log(error);
            alert(error);
          }
        );
      }
    });
  }
}
