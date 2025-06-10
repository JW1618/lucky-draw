import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
  HttpCode,
  ConflictException,
} from '@nestjs/common';
import { DrawResult, DrawService } from './draw.service';

@Controller('draw')
export class DrawController {
  constructor(private readonly drawService: DrawService) {}

  @Post('register')
  @HttpCode(200)
  register(@Body() body: { email: string }): {
    success: boolean;
    message: string;
  } {
    const { email } = body;

    if (!email || typeof email !== 'string') {
      throw new BadRequestException('Email is required and must be a string.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email format.');
    }

    const result = this.drawService.register(email);
    // Duplicate email
    if (!result.success) {
      throw new ConflictException(result.message);
    }
    return result;
  }

  @Get('winners')
  getWinners(): DrawResult {
    return this.drawService.getWinners();
  }
}
