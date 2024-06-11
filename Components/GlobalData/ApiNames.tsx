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
  public static getAllUsers: string =
    "api/Authentication/getAllUsers?page=1&pageSize=100";
  public static updateUser: string = "api/Authentication/UpdateUser?userID=";
  public static getSpecificuser: string =
    "api/Authentication/getSpecificUser?EmpCode=";
  public static userRequests: string = "api/Request/getAllSubmittedRequests?";
  public static specificUserRequests: string =
    "api/Request/getNoActionForASpecificUser?";
  public static getSubmittedRequests: string =
    "api/Request/getSubmittedForSpecificUser?";
  public static getIgnoredRequests: string =
    "api/Request/getIgnoredForASpecificUser?";
  public static getSpecificProgress: string =
    "api/Progress/getSpecificEmpProgress?userID=";
}
