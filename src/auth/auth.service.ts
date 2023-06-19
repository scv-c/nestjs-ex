import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentaisDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentaisDto: AuthCredentaisDto): Promise<void> {
    return this.userRepository.signUp(authCredentaisDto);
  }

  async signIn(
    authCredentaisDto: AuthCredentaisDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentaisDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      //유저 토큰 생성 (secret+payload) 중요한정보는 X
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
