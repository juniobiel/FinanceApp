import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { LocalStorageUtils } from "../Utils/localstorage";

export abstract class BaseService
{
  public LocalStorage = new LocalStorageUtils();
  protected UrlService: string = "https://localhost:7126/api/";

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
    return response.data || {};
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


    console.error(response);

    return throwError(() => new Error(response));
  }
}