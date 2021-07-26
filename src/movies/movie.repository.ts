import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './movie.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async findAllByUser(id: number) { // Not same work as second method, but same as third
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
  
  // async findAllByUser(id: number) { // Works as it should
  //   return (
  //     this.createQueryBuilder('movie')
  //       .leftJoinAndSelect(
  //         'movie.userDetails',
  //         'userDetails',
  //         `movie.id = userDetails.movieId AND userDetails.userId = ${id}`,
  //       )
  //       .getMany()
  //   );
  // }
  
  // async findAllByUser(id: number) { // Works as first method, not as second. Why?
  //   return this.createQueryBuilder('movie')
  //     .leftJoinAndSelect('movie.userDetails', 'userDetails')
  //     .where(`movie.id = userDetails.movieId`)
  //     .andWhere('userDetails.userId = :userId', { userId: id })
  //     .getMany();
  // }

  //First and third methods return
  //   [
  //     {
  //         "id": 1,
  //         "title": "test1",
  //         "genre": "test1",
  //         "userDetails": {
  //             "id": 1,
  //             "isFavorite": false,
  //             "isWatched": true,
  //             "isInWatchlist": false,
  //             "watchingDate": "2021-07-25T19:29:18.510Z",
  //             "userId": 1,
  //             "movieId": 1
  //         }
  //     },
  //     {
  //         "id": 2,
  //         "title": "test2",
  //         "genre": "test2",
  //         "userDetails": {
  //             "id": 2,
  //             "isFavorite": true,
  //             "isWatched": true,
  //             "isInWatchlist": false,
  //             "watchingDate": "2021-07-26T13:08:21.533Z",
  //             "userId": 1,
  //             "movieId": 2
  //         }
  //     },
  //     {
  //         "id": 3,
  //         "title": "test3",
  //         "genre": "test3",
  //         "userDetails": {
  //             "id": 3,
  //             "isFavorite": true,
  //             "isWatched": true,
  //             "isInWatchlist": true,
  //             "watchingDate": "2021-07-26T13:09:11.852Z",
  //             "userId": 1,
  //             "movieId": 3
  //         }
  //     }
  // ]
  
  // Second method returns (What i needed)
  // [
  //     {
  //         "id": 1,
  //         "title": "test1",
  //         "genre": "test1",
  //         "userDetails": {
  //             "id": 1,
  //             "isFavorite": false,
  //             "isWatched": true,
  //             "isInWatchlist": false,
  //             "watchingDate": "2021-07-25T19:29:18.510Z",
  //             "userId": 1,
  //             "movieId": 1
  //         }
  //     },
  //     {
  //         "id": 2,
  //         "title": "test2",
  //         "genre": "test2",
  //         "userDetails": {
  //             "id": 2,
  //             "isFavorite": true,
  //             "isWatched": true,
  //             "isInWatchlist": false,
  //             "watchingDate": "2021-07-26T13:08:21.533Z",
  //             "userId": 1,
  //             "movieId": 2
  //         }
  //     },
  //     {
  //         "id": 3,
  //         "title": "test3",
  //         "genre": "test3",
  //         "userDetails": {
  //             "id": 3,
  //             "isFavorite": true,
  //             "isWatched": true,
  //             "isInWatchlist": true,
  //             "watchingDate": "2021-07-26T13:09:11.852Z",
  //             "userId": 1,
  //             "movieId": 3
  //         }
  //     },
  //     {
  //         "id": 4,
  //         "title": "test4",
  //         "genre": "test4",
  //         "userDetails": null
  //     }
  // ]
}
