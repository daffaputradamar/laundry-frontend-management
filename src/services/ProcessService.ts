import { serviceTransact } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class ProcessService extends ServiceGenerator<IProcess> {
  protected endpoint = serviceTransact + "/api/v1/process/";
}
