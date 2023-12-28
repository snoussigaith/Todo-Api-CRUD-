import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { TodoEntity } from "./todo.entity";
import { todo } from "node:test";
@Entity('users')
export class userEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    username : string;
    @Column()
    password:string;
    @Column()
    salt:string;
    @OneToMany(()=> TodoEntity,(todo)=>todo.user)
    todos : TodoEntity[]


    /*async verifyPassword(password:string){
        const hash = await bcrypt.hash(password,this.salt);
        return hash == this.password;
    }*/

}