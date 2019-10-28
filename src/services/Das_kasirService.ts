import { serviceItem } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class DaskasirService extends ServiceGenerator<IDas_kasir> {
  protected endpoint = serviceItem + "/api/v1/items/";
}
