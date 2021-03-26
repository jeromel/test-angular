import { Component } from '@angular/core';
import { PriceListService } from './services/business-services/pricelist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-angular';

  constructor(private _priceListService: PriceListService) 
  {
    
  }

  public onClick(): void {
    this._priceListService.getAll().subscribe();
  }
}
