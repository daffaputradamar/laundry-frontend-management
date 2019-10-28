import { serviceTransact } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class ServiceService extends ServiceGenerator<IService> {
  protected endpoint = serviceTransact + "/api/v1/services/";
}
