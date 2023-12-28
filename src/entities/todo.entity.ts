import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { userEntity } from "./user.entity";


@Entity()
export class TodoEntity {
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title:String;
    @Column()
    description: String;
    @Column()
    status: TodoStatus;
    @ManyToOne(()=> userEntity ,(user)=>user.todos)
    user : userEntity;
    @Column()
    userId : number;
}

export enum TodoStatus{
    OPEN ='OPEN',
    WIP='WIP',
    COMPLETED='COMPLETED'
}
