import axios from "axios";
import { serviceTransact } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class DetailService extends ServiceGenerator<IDetail> {
  protected endpoint = serviceTransact + "/api/v1/detailTransaction/";

  public get() {
    const { _id } = JSON.parse(localStorage.getItem("transaction")!);
    return new Promise<IDetail[]>((resolve, reject) => {
      axios
        .get(this.endpoint + _id, { headers: this.getHeader() })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  }

  public create(input: IDetail) {
    return new Promise<IDetail>((resolve, reject) => {
      axios
        .post(this.endpoint, input, { headers: this.getHeader() })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  }
}
