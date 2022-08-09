import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CartServicesService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor() {}
  getProducts() {
    return this.productList.asObservable();
  }
  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addToCart({ product }: { product: any }): void {
    if (this.cartItemList.length < 4) {
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
      this.getAverageTime();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'success',
        title: 'añadido al carrito de compras',
      });
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'error',
        title: 'No puedes agregar mas de 4 productos al carrito',
      });
    }
    console.log(this.cartItemList);
  }
  getTotalPrice(): number {
    let grandTtotal = 0;
    this.cartItemList.map((a: any) => {
      grandTtotal += a.pricePerServing;
    });
    return grandTtotal;
  }

  getAverageScore() {
    let averageScore = 0;
    this.cartItemList.map((a: any) => {
      averageScore += a.healthScore;
    });
    return averageScore;
  }
  getAverageTime() {
    let averageTime = 0;
    this.cartItemList.map((a: any) => {
      averageTime += a.readyInMinutes;
    });
    return averageTime;
  }
  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
