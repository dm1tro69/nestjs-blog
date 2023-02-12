import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto, RegistrationDto } from "../models/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
}
 async login(loginDto: LoginDto){
     const user = await this.userRepository.findOne({where: {email: loginDto.email}})
   if (!user){
     throw new UnauthorizedException()
   }
   const isPassword = await bcrypt.compare(loginDto.password, user.password)
   if (!isPassword){
     throw new UnauthorizedException()
   }
   return user
  }
 async register(registerDto: RegistrationDto){
   const existUser = await this.userRepository.findOne({where: {email: registerDto.email}})
   if (existUser){
     throw new UnauthorizedException()
   }

   const user = this.userRepository.create(registerDto)
   await this.userRepository.save(user)
   return user
  }
}
