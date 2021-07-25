import {
  AfterUpdate,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Movie } from './movie.entity';

@Entity()
export class UserDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isFavorite: boolean;

  @Column({ default: false })
  isWatched: boolean;

  @Column({ default: false })
  isInWatchlist: boolean;

  @Column({ default: null })
  watchingDate: Date | null;

  @ManyToOne((type) => User, (user) => user.userDetails)
  user: User;
  @Column()
  userId: number;

  @ManyToOne((type) => Movie, (movie) => movie.userDetails)
  movie: Movie;
  @Column()
  movieId: number;

  @BeforeUpdate()
  updateDate() {
    if (this.isWatched && !this.watchingDate) {
      this.watchingDate = new Date();
    } else if (!this.isWatched) {
      this.watchingDate = null;
    }
  }
  @BeforeInsert()
  createDate() {
    this.updateDate();
  }
}
