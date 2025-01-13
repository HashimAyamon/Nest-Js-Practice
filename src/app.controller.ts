import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/login')
  getLogin() {
   return "<h1>Login Page</h1>"
  }

  @Get('/about')
  getAbout() {
   return "<h1>About Page</h1>"
  }
}
