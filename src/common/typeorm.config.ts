import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      synchronize: true,
      migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
      migrationsRun: false,
      logging: false,
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
  }
}

// const options: () => TypeOrmModuleOptions = () => ({
//   type: 'postgres',
//   host: process.env.POSTGRES_HOST,
//   port: Number(process.env.POSTGRES_PORT),
//   username: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DB,
//   entities: [`${__dirname}/**/*.entity{.ts,.js}`],
//   synchronize: true,
//   migrations: [`${__dirname}/migrations/*{.ts,.js}`],
//   migrationsRun: false,
//   cli: {
//     migrationsDir: 'src/migrations',
//   },
// });
//
// export = options;
