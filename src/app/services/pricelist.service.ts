import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BusinessSubscriptionService as SubscriptionBusinessService } from './subscription-business-service';
import { Brand } from '../models/brand';
import { PriceList } from '../models/pricelist';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
//tu peux etendre une classe mere autant de fois que tu veux, en utilisant zero, un ou plusieurs templates
export class PriceListService extends SubscriptionBusinessService<PriceList, Brand> {

  public initializeWhenSubjectReceived(): void {
    super.initializeWhenSubjectReceived();

    //soit ici tu peux utiliser une methode propre a cette class PriceListService
    this.filterPriceList();

    //soit tu peux creer une methode public ou protected dans la classe mere SubscriptionBusinessService
    super.getFilterBy("field_brand");
  }

  public filterPriceList(): void {
    //realise ici le filte que tu veux
  }

  public getAll(): Observable<Array<PriceList>> {
    let params = new Map<string, string>();
    return super._myAppApiService.getAllPriceList().pipe(tap(( pricesLists: Array<PriceList>) => {
      super.subscription.next(pricesLists);
    }))
  }

  //tu peux utiliser les parameters public ou protected de la classe mere avec super pour creer des methodes particulieres
  public getPriceListById(id: number): Observable<PriceList> {
    return super._myAppApiService.getPriceListById(id).pipe(tap( (priceList: PriceList) => {
      return priceList;
    }));
  }
}