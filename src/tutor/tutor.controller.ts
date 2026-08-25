import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { TutorService } from './tutor.service';

@ApiTags('AI Tutor')
@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  // P1-03: sin límite específico, un estudiante podía generar llamadas a
  // OpenAI sin control de costo más allá del límite global (que no estaba
  // activo hasta este bloque).
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @Post('chat')
  @ApiOperation({ summary: 'Enviar un mensaje al Tutor IA adaptativo' })
  async chat(@Body('message') message: string, @GetUser() user: User) {
    const response = await this.tutorService.sendMessage(user.id, message);
    return {
      success: true,
      message: response
    };
  }
}
