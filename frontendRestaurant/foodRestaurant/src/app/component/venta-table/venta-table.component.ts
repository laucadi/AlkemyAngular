import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartServicesService } from 'src/app/servicios/cart-services.service';

@Component({
  selector: 'app-venta-table',
  templateUrl: './venta-table.component.html',
  styleUrls: ['./venta-table.component.scss'],
})
export class VentaTableComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Output() onCloseModal = new EventEmitter<any>();
  public products: any = [];
  public grandTotal!: number;
  public averageScore!: number;
  public averageTime!: number;

  constructor(private cartService: CartServicesService) {}

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
      this.averageScore = this.cartService.getAverageScore();
      this.averageTime = this.cartService.getAverageTime();
    });
  }
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  emptyCart() {
    this.cartService.removeAllCart();
  }
  public onPress(element: MouseEvent) {
    const node = element.target as HTMLElement;
    if (node.id === 'outer') {
      this.onCloseModal.emit();
    }
  }
}
