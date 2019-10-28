import { serviceMember } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class MemberService extends ServiceGenerator<IMember> {
  protected endpoint = serviceMember + "/api/v1/members/";
}
