import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '2d'
        }
      }
    }
  }),PassportModule.registerAsync({
     useFactory: ()=> ({
       defaultStrategy: 'jwt'
     })
  }),TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports:[PassportModule, JwtStrategy]
})
export class AuthModule {}
