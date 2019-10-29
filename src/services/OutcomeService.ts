import { serviceItem } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class OutcomeService extends ServiceGenerator<IOutcome> {
  protected endpoint = serviceItem + "/api/v1/outcome/";
}
