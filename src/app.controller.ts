import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  healthCheck(): object {
    return { success: true, version: '0.0.1' };
  }
}
