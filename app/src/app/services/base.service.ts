import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { LocalStorageUtils } from "../Utils/localstorage";

export abstract class BaseService
{
  public LocalStorage = new LocalStorageUtils();
  protected UrlService: string = environment.urlApi;

  protected GetJsonHeader()
  {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  protected extractData(response : any)
  {
    return response || {};
  }

  protected serviceError(response: Response | any) 
  {
    let customError : string[] = [];

    if(response instanceof HttpErrorResponse)
    {
      if(response.statusText === "Unknown Error")
      {
        customError.push("Ocorreu um erro desconhecido");
        response.error.errors = customError;
      }
    }
    
    return throwError(response);
  }
}