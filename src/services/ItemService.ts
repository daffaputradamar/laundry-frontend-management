import { serviceItem } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class ItemService extends ServiceGenerator<IItem> {
  protected endpoint = serviceItem + "/api/v1/items/";
}
