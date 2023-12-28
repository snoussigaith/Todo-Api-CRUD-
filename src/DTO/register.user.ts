import { IsNotEmpty, MinLength } from "@nestjs/class-validator";
import { Matches, MaxLength } from "class-validator";

export class registerUserDto{
    @IsNotEmpty()
    username:string;
    @IsNotEmpty()
    @MaxLength(12)@MinLength(6)
    @Matches(/(?:(?=.*\d)|(?=.*\W))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message:"password is too weak,choose a strong passord between 6 and 12 characters"
        
    })
    password:string;
}