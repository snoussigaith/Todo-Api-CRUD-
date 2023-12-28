import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtStrategy } from './jwt.custom.startegy';

@Module({
  imports:[TypeOrmModule.forFeature([userEntity]),
JwtModule.register({
  secret:'flghdfslghmdfshg',
  signOptions: {
    algorithm:'HS512',
    expiresIn:'1d'
  }
}),
PassportModule.register({
  defaultStrategy:'jwt'
})
],
  providers: [AuthService,jwtStrategy],
  controllers: [AuthController],
  exports:[PassportModule,jwtStrategy]
})
export class AuthModule {}
