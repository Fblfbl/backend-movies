import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { GetUser } from './get-user-decorator';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  create(@Body() user: UserDto) {
    return this.authService.create(user);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@GetUser() user: User) {
    return this.authService.login(user);
  }
}
