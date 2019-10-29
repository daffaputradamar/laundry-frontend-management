import { serviceUser } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class SalaryService extends ServiceGenerator<ISalary> {
  protected endpoint = serviceUser + "/api/v1/salary/";
}
