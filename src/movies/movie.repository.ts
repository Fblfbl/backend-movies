import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './movie.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async findAllByUser(id: number) {
    return this.find({
      relations: ['userDetails'],
      join: {
        alias: 'movies',
        leftJoinAndSelect: { userDetails: 'movies.userDetails' },
      },
      where: (qb) => {
        qb.where('userDetails.userId = :userId', { userId: id });
      },
    });
  }
}
