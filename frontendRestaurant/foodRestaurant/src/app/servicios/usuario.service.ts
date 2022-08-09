import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const url_usuario = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public token: any;
  public correo: any;
  public id: any;

  constructor(private http: HttpClient) {}

  crear(data: any) {
    return this.http.post<any>(url_usuario + 'usuario/crearUsuario', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  login(user: any, obtenerToken = null): Observable<any> {
    let json = user;
    if (obtenerToken != null) {
      user.token = true;
    }
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(url_usuario + 'usuario/loginUsuario', json, {
      headers: headers,
    });
  }
  obtenerToken(): Observable<any> {
    let tokenAuxiliar = localStorage.getItem('token');
    if (tokenAuxiliar) {
      this.token = tokenAuxiliar;
    } else {
      this.token = null;
    }
    return this.token;
  }

  obtenerId(): Observable<any> {
    let id = localStorage.getItem('id');
    if (id) {
      this.id = id;
    } else {
      this.id = null;
    }

    return this.id;
  }
}
