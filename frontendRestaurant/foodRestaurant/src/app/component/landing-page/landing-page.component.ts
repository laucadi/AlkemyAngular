import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  debounceTime,
  distinct,
  filter,
  fromEvent,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { Recipe } from 'src/app/interfaces/recipes';
import { SpoonacularService } from 'src/app/servicios/spoonacular.service';
import { CartServicesService } from 'src/app/servicios/cart-services.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  @ViewChild('recipeSearchInput', { static: true })
  recipeSearchInput!: ElementRef;
  recipe$!: Observable<Recipe[]>;
  public showModal: boolean = false;
  public token: any;
  public p: number = 2;
  public totalItem: number = 0;
  public recipes: Recipe[] = [];
  constructor(
    private spoonacularService: SpoonacularService,
    private cartService: CartServicesService
  ) {}

  ngOnInit(): void {
    this.recipe$ = fromEvent<Event>(
      this.recipeSearchInput.nativeElement,
      'keyup'
    ).pipe(
      map((event: Event) => {
        const searchRecipe = (event.target as HTMLInputElement).value;
        return searchRecipe;
      }),
      filter((searchTerm: string) => searchTerm.length > 2),
      debounceTime(500),
      distinct(),
      switchMap((searchRecipe: string) =>
        this.spoonacularService.getRecipe({ searchRecipe })
      )
    );
    this.productoItem();
  }
  /*
  getRecipe(searchRecipe: string) {
    this.spoonacularService.getRecipe(searchRecipe).subscribe((recipes) => {
      console.log(recipes);
      this.recipes = recipes;
    });
  }*/

  productoItem() {
    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });
  }
  modal() {
    this.showModal = true;
  }
  public onCloseModal() {
    this.showModal = false;
  }
}
