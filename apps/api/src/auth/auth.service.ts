import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password, name } = signUpDto;

    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      name,
    });

    return {
      message: 'User registered successfully',
      userId: user.id,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    
    // 유저 정보에서 패스워드 제거
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken: await this.jwtService.signAsync(payload, { expiresIn: '1h' }),
      refreshToken: await this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      const newPayload = { sub: payload.sub, email: payload.email, role: payload.role };
      
      return {
        accessToken: await this.jwtService.signAsync(newPayload, { expiresIn: '1h' }),
      };
    } catch {
      throw new UnauthorizedException('REFRESH_TOKEN_EXPIRED');
    }
  }
}
