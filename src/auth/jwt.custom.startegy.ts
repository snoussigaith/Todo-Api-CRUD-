import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { userEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";

export class jwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(userEntity)private repo:Repository<userEntity>){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'flghdfslghmdfshg'
        });
    }
    async validate (payLoad : {username:string}){
        const {username}=payLoad;
        const user = await this.repo.findOne({where :{username}});
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}