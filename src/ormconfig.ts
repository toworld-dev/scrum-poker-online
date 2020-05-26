import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number(process.env.TYPEORM_PORT || 5432),
  username: process.env.TYPEORM_USERNAME || 'postgres',
  password: process.env.TYPEORM_PASSWORD || 'password',
  database: process.env.TYPEORM_DATABASE || 'scrumpoker',
  synchronize: process.env.TYPEORM_SYNCHRONIZE
    ? JSON.parse(process.env.TYPEORM_SYNCHRONIZE)
    : false,
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN
    ? JSON.parse(process.env.TYPEORM_MIGRATIONS_RUN)
    : false,
  logging: process.env.TYPEORM_LOGGING
    ? JSON.parse(process.env.TYPEORM_LOGGING)
    : false,
  entities: [`${__dirname}/**/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  keepConnectionAlive: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = config;
