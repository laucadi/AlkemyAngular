import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipes';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { CartServicesService } from 'src/app/servicios/cart-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input('recipe') recipe!: Recipe;
  public token: any;
  public menuV!: any;
  public menuC!: any;

  constructor(
    private usuarioService: UsuarioService,
    private cartService: CartServicesService
  ) {
    this.token = this.usuarioService.obtenerToken();
  }

  ngOnInit(): void {
    //console.log(this.recipe);
    //this.menuVegano();
    //this.menuCorriente();
  }
  /*
  menuVegano() {
    this.menuV = JSON.parse(localStorage.getItem('vegano') || '{}');
  }

  menuCorriente() {
    this.menuC = JSON.parse(localStorage.getItem('corriente') || '{}');
  }*/

  addToCart(item: any) {
    this.cartService.addToCart({ product: item });
  }
}
