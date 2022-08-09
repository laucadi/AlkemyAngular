import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { SpoonResponse } from '../interfaces/spoonRespone';
import { Recipe } from '../interfaces/recipes';

const { base_url } = environment;

@Injectable({
  providedIn: 'root',
})
export class SpoonacularService {
  public correo: any;
  public token: any;
  public identity: any;
  public apiKey = 'apiKey=b5c303b963ef46b68f9a99feec153a12';
  contrasena!: string;
  public auxCorriente: any;
  public auxVeg: any;

  constructor(private http: HttpClient) {}

  getRecipe({ searchRecipe }: { searchRecipe: string }): Observable<Recipe[]> {
    return this.http
      .get<SpoonResponse>(
        `${base_url}?query=${searchRecipe}&addRecipeInformation=true&${this.apiKey}`
      )
      .pipe(
        map((response) => {
          return response.results;
        })
      );
  }

  /*   menuVegano() {
    return this.http
      .get<any>(
        `${base_url}?diet=vegetarian&addRecipeInformation=true&number=4&${this.apiKey}`
      )
      .pipe(
        map((res: any) => {
          const menuVegano = localStorage.getItem('vegano');
          if (!menuVegano) {
            this.auxVeg = res.results;
            localStorage.setItem('vegano', JSON.stringify(this.auxVeg));
          }
          return this.auxVeg;
        })
      );
  }

  menuCorriente() {
    return this.http
      .get<any>(
        `${base_url}?sort=popularity&addRecipeInformation=true&number=8&${this.apiKey}`
      )
      .pipe(
        map((res: any) => {
          this.auxCorriente = res.results;
          const menuCorriente = localStorage.getItem('corriente');
          if (!menuCorriente) {
            localStorage.setItem(
              'corriente',
              JSON.stringify(this.auxCorriente)
            );
          }
          return this.auxCorriente;
        })
      );
  }*/
}
