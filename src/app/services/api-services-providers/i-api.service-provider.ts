import { Observable } from "rxjs";
import { PriceList } from "../../models/pricelist";

//si tu fais une interface / et donc un service provider unique, tu peux mocker plus facilement a un seul endroit
export interface IApiServiceProvider {
    
    getAllPriceList(): Observable<Array<PriceList>>;
    getPriceListById(id: number) : Observable<PriceList>;
}