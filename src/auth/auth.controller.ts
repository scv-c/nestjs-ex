import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredntaisDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredntaisDto: AuthCredntaisDto): Promise<void> {
    return this.authService.createUser(authCredntaisDto);
  }
}
