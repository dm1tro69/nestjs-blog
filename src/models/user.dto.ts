import { IsEmail, IsString } from "class-validator";

export class LoginDto {

  @IsEmail()
  email: string

  @IsString()
  password: string
}

export class RegistrationDto extends LoginDto{

  @IsString()
  username: string
}

