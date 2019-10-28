import { serviceTransact } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class StatusService extends ServiceGenerator<IStatus> {
  protected endpoint = serviceTransact + "/api/v1/statuses/";
}
