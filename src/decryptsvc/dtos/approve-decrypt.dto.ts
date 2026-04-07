import { IsBoolean } from "class-validator";

export class ApproveDecryptDto {
  @IsBoolean()
  approved: boolean;

}