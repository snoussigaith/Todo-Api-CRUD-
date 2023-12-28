import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/DTO/todo.create.dto';
import { TodoStatusValidationPipe } from 'src/pipe/TodoStatusValidation.pipe';
import { TodoStatus } from 'src/entities/todo.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { userEntity } from 'src/entities/user.entity';
// http://localhost:3000/api/todo
@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  

    constructor(private todoService:TodoService){

    }
    //http verb
    @Get()
    getAllTodos( 
        @User() user :userEntity
    ) {
       
        //console.log(this.todoService.getAllTodos());
        return this.todoService.getAllTodos(user);
        
    }
    @Post()
    creatNewTodo(@Body(ValidationPipe) data:CreateTodoDto,@User() user :userEntity){
       

         return this.todoService.createTodo(data,user);

    }
    @Patch(':id')
    updateTodo(
        @Body('status',TodoStatusValidationPipe)status:TodoStatus,
        @Param('id')id:number,@User() user :userEntity
    ){
       return this.todoService.update(id,status,user);
        
    }
    @Delete(':id')
    deleteTodo(@Param('id') id:number, @User() user :userEntity){
        return this.todoService.delete(id,user);
    }

}
