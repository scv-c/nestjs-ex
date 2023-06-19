import {
  Controller,
  Post,
  Get,
  Body,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentaisDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentaisDto: AuthCredentaisDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentaisDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentaisDto: AuthCredentaisDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentaisDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log('req', req);
  }
}
