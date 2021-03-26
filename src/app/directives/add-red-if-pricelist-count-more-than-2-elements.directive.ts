import { Directive, ElementRef, Inject, Renderer2 } from "@angular/core";
import { PriceListService } from "../services/business-services/pricelist.service";

@Directive({
    selector: '[addRedIfPriceListMoreThan2Elements]'
  })
  export class AddRedIfPriceListContainsMoreThan2ElementsDirective {

    constructor(private el: ElementRef, private renderer: Renderer2, 
        private _priceListService: PriceListService) {
           this._priceListService.values$.subscribe(x => {
               if (x.length > 2) {
                this.renderer.addClass(el.nativeElement, 'red-class');
               }
           });

    }
}