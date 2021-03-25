import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PriceListService } from './services/business-services/pricelist.service';
import { MockJsonApiServiceProvider } from './services/api-services-providers/mock-json-api.service-provider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    //ici tu indiques grace au InjectToken "MyAppApiServiceProvider" que tu veux utiliser le "MockJsonApiServiceProvider" a chaque fois que dans le constructor tu auras appele cet "InjectToken", par exemple "PriceListService" puisqu'il etend
     // la classe mere BusinessSubscriptionService
    { provide: "MyAppApiServiceProvider", useClass: MockJsonApiServiceProvider },
    PriceListService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
