import { serviceDiskon } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class DiskonService extends ServiceGenerator<IDiskon> {
  protected endpoint = serviceDiskon + "/api/v1/rules/";
}
