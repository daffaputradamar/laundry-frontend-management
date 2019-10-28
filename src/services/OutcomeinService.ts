import { serviceItem } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class OutcomeinService extends ServiceGenerator<IOutcomein> {
  protected endpoint = serviceItem + "/api/v1/outcomeins/";
}
