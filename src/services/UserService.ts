import { serviceUser } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class UserService extends ServiceGenerator<IUser> {
  protected endpoint = serviceUser + "/api/v1/users/";
}
