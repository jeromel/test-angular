import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { PriceList } from "../../models/pricelist";
import { HttpService } from "../common-services/http.service";
import { IApiServiceProvider } from "./i-api.service-provider";

@Injectable()
export class MockJsonApiServiceProvider implements IApiServiceProvider {

    constructor( 
        private _httpService: HttpService
        ) {

    }

    //ici en utilisant la class MockJsonApiServiceProvider, tu peux facilement gerer le traitement specifique aux json, par exemple leurs urls
    public getAllPriceList(): Observable<PriceList[]> {
        let params: Map<string, string> =  new Map<string, string>();
        
        console.debug('getAllPriceList');
        //return this._httpService.getObject<Array<PriceList>>('assets/api/pricelist/get.json', params);
        return of( [ new PriceList(), new PriceList, new PriceList() ]);
    }

    public getPriceListById(id: number): Observable<PriceList> {
        //si vous definissez une convention sur vos apis, vous pouvez limitez les lignes pour gerer les params, comme nous l'avons fait dans "microservice.http.service.ts"
        let params: Map<string, string> =  new Map<string, string>();

        params.set('id', id.toString());

        return this._httpService.getObject<PriceList>('assets/api/pricelist/get.json', params);
    }
}