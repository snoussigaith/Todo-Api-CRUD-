import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDto } from 'src/DTO/register.user';
import { UserLoginDto } from 'src/DTO/login.user';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){

    }
    @Post('register')
    registration(@Body(ValidationPipe) regDTO:registerUserDto ){
        
        return this.authService.RegisterUser(regDTO);

    }
    @Post('login')
    signin(@Body(ValidationPipe)loginDTo:UserLoginDto){
        return this.authService.loginUser(loginDTo);
    }
}
