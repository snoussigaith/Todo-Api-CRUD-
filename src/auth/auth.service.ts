import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { registerUserDto } from 'src/DTO/register.user';
import { userEntity } from 'src/entities/user.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import * as bcrypt from'bcryptjs';
import { UserLoginDto } from 'src/DTO/login.user';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(userEntity) private repo: Repository<userEntity>, private jwt:JwtService){

    }
   async RegisterUser(registerDto:registerUserDto)
    {
        const{username,password}= registerDto;
        const hashed = await bcrypt.hash(password,12);
        const salt = await bcrypt.getSalt(hashed);
        
        console.log(hashed);
        const user = new userEntity();
        user.username=username;
        user.password=hashed;
        user.salt=salt;


        this.repo.save(user);
        return await this.repo.save(user);

    }
    async loginUser(userloginDTO:UserLoginDto){
       const {username,password}= userloginDTO;
       
       
       
       const user = await this.repo.findOne({ where: { username } });
      
       if(!user){
        throw new UnauthorizedException('invalid credentials!!');
       }
       const isPasswordMatch = await bcrypt.compare(password, user.password)
       if(isPasswordMatch){
        const jwtPayload = {username};
        const jwtToken = await this.jwt.signAsync(jwtPayload,{expiresIn:'1d',algorithm:'HS512'}) 
        return {token:jwtToken};
       }else{
        throw new UnauthorizedException('invalid credentials !!!! ');
       }

    }
}
