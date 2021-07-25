import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MovieDto } from './movie.dto';
import { UserDetail } from './user-details.entity';
import { Repository } from 'typeorm';
import { UserMovieStatusDto } from './user-movie-status.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieRepository)
    private movieRepository: MovieRepository,
    @InjectRepository(UserDetail)
    private statusRepository: Repository<UserDetail>,
  ) {}

  async getAll() {
    return this.movieRepository.find();
  }

  async getAllByUser(userId: number) {
    return this.movieRepository.findAllByUser(userId);
  }

  async createMovie(movieDto: MovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(movieDto);
    await this.movieRepository.save(movie);
    return movie;
  }

  async updateUserStatus(
    status: UserMovieStatusDto,
    id: number,
    userId: number,
  ) {
    const foundedStatus = await this.statusRepository.findOne({
      where: { movieId: id, userId },
    });
    if (!foundedStatus) {
      const newStatus = this.statusRepository.create({
        ...status,
        movieId: id,
        userId,
      });
      await this.statusRepository.save(newStatus);
      return {
        message: `Status for movie with id ${id} and user with id ${userId} successfully created`,
      };
    }
    Object.assign(foundedStatus, { ...status, movieId: id, userId });
    await this.statusRepository.save(foundedStatus);
    console.log(foundedStatus);
    return {
      message: `Status for movie with id ${id} and user with id ${userId} successfully updated`,
    };
  }
}
