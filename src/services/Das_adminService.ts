import { serviceItem } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class DasadminService extends ServiceGenerator<IDas_admin> {
  protected endpoint = serviceItem + "/api/v1/items/";
}
