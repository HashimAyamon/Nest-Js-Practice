import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly ConfigService:ConfigService){}
  getHello(): string {
    return 'APP running in port' + this.ConfigService.get('port') 
  }
}
