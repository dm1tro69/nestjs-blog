import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegistrationDto } from "../models/user.dto";

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto)
  }


  @Post()
  register(@Body() registerDto: RegistrationDto){
    return this.authService.register(registerDto)
  }

}
