import { serviceItem } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class ItemoutService extends ServiceGenerator<IItemout> {
  protected endpoint = serviceItem + "/api/v1/itemOut/";
}
