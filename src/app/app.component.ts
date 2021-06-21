import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { GroupProduct } from './models/GroupProduct';
import { ICommerceLineItem } from './models/i-commerce-line-items';
import { Product } from './models/product';
import { Promo } from './models/promo';
import { TestCommerceLineItem } from './models/test-commerce-line-item';
import { PriceListService } from './services/business-services/pricelist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-angular';

  constructor(private _priceListService: PriceListService) 
  {
    
  }
  ngOnInit(): void {
    this._priceListService.getAll().pipe(takeUntil(this.unsubscribe)).subscribe(x => {
      // traiter les donnees recues
    });

    this._priceListService.getAll().pipe(take(1)).subscribe(x => {
      // traiter les donnees recues
    });
  }

  private unsubscribe: Subject<void> = new Subject();

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


  public onClick(): void {
    let arr: Array<ICommerceLineItem> = [];

    let prod: Product = new Product;
    prod.name = "Je suis un produit mais aussi un IPurchased";
    let cli : ICommerceLineItem = new TestCommerceLineItem;
    cli.purchased_entity = prod
    arr.push(cli);

    let gp: GroupProduct = new GroupProduct;
    gp.name = "Je suis un groupe de produit mais aussi un IPurchased";
    let cli2: ICommerceLineItem  = new TestCommerceLineItem;
    cli2.purchased_entity = gp;
    arr.push(cli2);


    let promo: Promo= new Promo;
    promo.name = "Je suis une promo mais aussi un IPurchased";
    let cli3: ICommerceLineItem  = new TestCommerceLineItem;
    cli3.purchased_entity = promo;
    arr.push(cli3);

    arr.forEach(x => {
      console.debug(x.purchased_entity.name);
    });
  }
}
