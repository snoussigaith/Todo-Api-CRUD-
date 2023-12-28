import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { CreateTodoDto } from 'src/DTO/todo.create.dto';
import { TodoEntity, TodoStatus } from 'src/entities/todo.entity';
import { userEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
   
  

    constructor(@InjectRepository(TodoEntity) private repo:Repository<TodoEntity>){

    }

   async getAllTodos(user:userEntity) {
    const query = await this.repo.createQueryBuilder('todo');
    query.where('todo.userId = :userId',{userId:user.id});
    try{
        await query.getMany();
    }catch(err){
        throw new NotFoundException('No task found') ;
    }
        
    }
    async createTodo(createTodoDTO:CreateTodoDto,user:userEntity) {
const todo = new TodoEntity();
const{title,description}=createTodoDTO;
todo.title=title;
todo.description=description;
todo.status=TodoStatus.OPEN;
todo.userId=user.id;

         this.repo.create(todo);
         try{
         return await this.repo.save(todo);
    } catch(err){
        throw new InternalServerErrorException('somthing went wrong , todo not created ')
    }
}
 async update(id: number, status: TodoStatus,user:userEntity) {
   
    try{
        await this.repo.update({id,userId:user.id},{status:status as any});
       return await this.repo.findOne({ where: { id } });
        

    }catch(err){
        throw new InternalServerErrorException('something went wrong !! cant update');
    }
   
    
}
async delete(id:number,user:userEntity) {
    const result = await this.repo.delete({id,userId:user.id});
    if(result.affected ==0){
        throw new NotFoundException('todo not delete');
    }else{
        return{success:true}
    }
    
    
}

}
