import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MovieDto } from './movie.dto';
import { MoviesService } from './movies.service';
import { UserMovieStatusDto } from './user-movie-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user-decorator';
import { User } from '../auth/user.entity';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @Get('all')
  getAll() {
    return this.movieService.getAll();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllByUser(@GetUser() user: User) {
    return this.movieService.getAllByUser(user.id);
  }

  @Post()
  create(@Body() movieDto: MovieDto) {
    return this.movieService.createMovie(movieDto);
  }

  @Patch('/:id/status')
  @UseGuards(JwtAuthGuard)
  updateUserStatus(
    @Body() status: UserMovieStatusDto,
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.movieService.updateUserStatus(status, id, user.id);
  }
}
