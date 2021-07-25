import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const { login, name, email, password } = userDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      login,
      name,
      email,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('User with this login already exists');
      }
      throw new InternalServerErrorException();
    }
    return user;
  }

  async login(user: User): Promise<{ token: string }> {
    const payload = { login: user.login };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ login });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
