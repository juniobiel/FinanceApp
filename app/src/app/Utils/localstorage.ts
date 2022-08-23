export class LocalStorageUtils
{
  public getUser() 
  {
    return JSON.parse(localStorage.getItem('api.user'));
  }

  public saveUserLocalData(response : any)
  {
    this.saveUserToken(response.accessToken);
    this.saveUser(response.userToken);
  }

  public cleanUserLocalData()
  {
    localStorage.removeItem('api.user');
    localStorage.removeItem('api.token');
  }

  public getUserToken() : string 
  {
    return localStorage.getItem('api.token');
  }

  public saveUserToken(token: string)
  {
    localStorage.setItem('api.token', token);
  }

  public saveUser(user: string)
  {
    localStorage.setItem('api.user', JSON.stringify(user));
  }
}