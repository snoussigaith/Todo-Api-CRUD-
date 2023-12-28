import { IsNotEmpty, MaxLength } from "@nestjs/class-validator";

export class CreateTodoDto {
    @IsNotEmpty()
    @MaxLength(15,{message:'Maw length is 15 characters'})
    title: string;
    @IsNotEmpty()
    description : string;
}