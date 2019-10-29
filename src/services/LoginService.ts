import axios from "axios";
import { serviceUser } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

interface ILogin {
  token?: string;
  user?: IUser;
}

export class LoginService extends ServiceGenerator<ILogin> {
  protected endpoint = serviceUser + "/api/v1/user/login";

  public login(username: string, password: string) {
    return new Promise<ILogin>((resolve, reject) => {
      axios
        .post(
          this.endpoint,
          { username, password },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  }
}
