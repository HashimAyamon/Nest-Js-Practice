import { Get,Controller} from '@nestjs/common';

@Controller('/todo')
export class TodoController {


    @Get('/create')
    createTodo(){
        return{
            msg:"createTodo"
        }
    }
}
