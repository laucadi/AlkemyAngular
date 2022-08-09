import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public id: any;
  public token: any;
  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.id = this.usuarioService.obtenerId();
    this.token = this.usuarioService.obtenerToken();
  }

  ngOnInit(): void {}
  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');

    this.id = null;
    this.token = null;
    Swal.fire({
      text: 'Has cerrado sesión correctamente!',
      confirmButtonColor: '#efa13f',
    });

    this.router.navigate(['']);
  }
}
