import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { EMPTY, throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class HttpService {

  constructor(protected http: HttpClient,
    @Inject('BASE_URL') public baseURL: string,
    protected router: Router) { }

  public httpClient(): HttpClient {
    return this.http;
  }

  public get(path: string, cache: boolean = false, parameters?: Map<string, string>) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let params = new HttpParams();

    if (parameters) {
      parameters.forEach((value: string, key: string) => {
        params = params.append(key, value);
      });
    }

    return this.http.get(path, { headers: headers, params: params }).pipe(catchError(err => {
      if (401 == err.status) {
        this.router.navigateByUrl('/login');
        return EMPTY;
      } else {
        return throwError(err);
      }
    }));
  }

  public getObject<T>(path: string, parameters?: Map<string, string>): Observable<T> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let params = new HttpParams();

    if (parameters) {
      parameters.forEach((value: string, key: string) => {
        params = params.append(key, value);
      });
    }

    return this.http.get<T>(path, { headers: headers, params: params }).pipe(
      catchError(err => {
        if (401 == err.status) {
          this.router.navigateByUrl('/login');
          return EMPTY;
        } else {
          return throwError(err);
        }
      })

    );

  }

  public postObject<T>(path: string, postBody: any, multipart?: boolean): Observable<T> {


    let headers: HttpHeaders = new HttpHeaders();
    if (multipart === true) {
      headers.set('Content-Type', 'multipart/form-data');
    } else {
      headers.set('Content-Type', 'application/json; charset=utf-8');
    }

    return this.http.post<T>(path, postBody, { headers: headers }).pipe(catchError(err => {
      if (401 == err.status) {
        this.router.navigateByUrl('/login');
        return EMPTY;
      } else {
        return throwError(err);
      }
    }));
  }

  public patch(path: string, patchBody: any, multipart?: boolean): Observable<Response> {

    let headers = new HttpHeaders();
    let params = new HttpParams();

    if (multipart === true) {
      headers.set('Content-Type', 'multipart/form-data');
    } else {
      headers.set('Content-Type', 'application/json');
    }

    return this.http.patch<Response>(path, patchBody, { headers: headers }).pipe(catchError(err => {
      if (401 == err.status) {
        this.router.navigateByUrl('/login');
        return EMPTY;
      } else {
        return throwError(err);
      }
    }));
  }

  public postToGetFile(path: string, postBody: any): Observable<HttpResponse<Blob>> {
    let headers: HttpHeaders = new HttpHeaders();

    headers.set('Content-Type', 'application/json');

    return this.http.post(path, postBody, { headers: headers, observe: 'response', responseType: 'blob' }).pipe(catchError(err => {
      if (401 == err.status) {
        this.router.navigateByUrl('/login');
        return EMPTY;
      } else {
        return throwError(err);
      }
    }));
  }

  public RequestFile(apiPath: string, apiArgs: any): boolean {
    let ret: boolean = false;

    this.postToGetFile(apiPath, apiArgs).subscribe(result => {
      let contentDispositionHeader: string = result.headers.get('Content-Disposition');
      let parts: string[] = contentDispositionHeader.split(';');
      let fileName: string = parts[1].split('=')[1];

      // pour utiliser la ligne ci-dessous, il faut utiliser la librairie "file-saver" : npm i file-saver
      //saveAs(result.body, fileName);
    }, error => console.error(error));

    return ret;
  }
}
