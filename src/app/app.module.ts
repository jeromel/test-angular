import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PriceListService } from './services/business-services/pricelist.service';
import { MockJsonApiServiceProvider } from './services/api-services-providers/mock-json-api.service-provider';
import { HttpService } from './services/common-services/http.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { BusinessSubscriptionService } from './services/business-services/subscription-business-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
  ],
  providers: [
    //ici tu indiques grace au InjectToken "MyAppApiServiceProvider" que tu veux utiliser le "MockJsonApiServiceProvider" a chaque fois que dans le constructor tu auras appele cet "InjectToken", par exemple "PriceListService" puisqu'il etend
     // la classe mere BusinessSubscriptionService
    { provide: "MyAppApiServiceProvider", useClass: MockJsonApiServiceProvider },
    BusinessSubscriptionService,
    PriceListService,
    HttpService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
