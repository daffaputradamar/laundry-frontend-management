import { serviceItem } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class IteminService extends ServiceGenerator<IItemin> {
  protected endpoint = serviceItem + "/api/v1/itemins/";
}
