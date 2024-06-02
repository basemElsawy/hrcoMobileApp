export const environment = {
  baseUrl: "http://10.1.4.204:55555/",
  production: false,
};

export class ApiName {
  public static LoginApi: string = "api/Authentication/LoginApi";
  public static UpdateApi_patch: string = "api/Authentication/UpdateUser";
  public static UserComents_GET: string =
    "api/Comments/getSpecificComment?searchQuery=";
  public static requestTypes: string = "api/Request/getReqTypes";
  public static createRequests: string = "api/Request/createRequest";
  public static getEmplpoyeeComments: string =
    "api/Comments/getSpecificComment?searchQuery=";
}
