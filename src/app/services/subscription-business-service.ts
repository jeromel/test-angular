import { Subject } from "rxjs";
import { Inject } from '@angular/core';
import { IApiServiceProvider } from './api-services-providers/i-api.service-provider';

//tu peux etendre une classe mere autant de fois que tu veux, en utilisant zero, un (T) ou plusieurs templates (T, K, ....)
export class BusinessSubscriptionService<T, K> {

  public subscription = new Subject<Array<T>>();
  public values$ = this.subscription.asObservable();
  public values: T[] = [];

  public filteredValues: K[] = [];

  constructor(
    @Inject('MyAppApiServiceProvider') protected _myAppApiService: IApiServiceProvider,

  ) {
    this.values$.subscribe((val: Array<T>) => {
      this.values = Object.assign(val);
      this.initializeWhenSubjectReceived();
    });
  }

  protected initializeWhenSubjectReceived(): void {  }

  public getFilterBy(filterColumnName: string): Array<K> {
    this.values.forEach((item) => {
      this.filteredValues.push(item[filterColumnName]);
    });
    return this.filteredValues;
  }
}
