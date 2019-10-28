import { serviceTransact } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class TransactionService extends ServiceGenerator<ITransaction> {
  protected endpoint = serviceTransact + "/api/v1/transactions/";
}
