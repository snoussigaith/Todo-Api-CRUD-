import { Module, Options } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TodoEntity } from 'src/entities/todo.entity';
import { AuthModule } from 'src/auth/auth.module';



@Module({
  imports :[
    TypeOrmModule.forFeature([TodoEntity]),AuthModule
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
