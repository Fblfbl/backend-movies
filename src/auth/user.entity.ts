import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDetail } from '../movies/user-details.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  login: string;

  @OneToMany((type) => UserDetail, (userDetail) => userDetail.user)
  userDetails: UserDetail[];
}
