import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

let ormconfig;

// teste
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();

  ormconfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'scrumpoker',
    synchronize: true,
    migrationsRun: false,
    logging: true,
    logger: 'file',
    keepConnectionAlive: false,
    entities: [`${__dirname}/**/**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    cli: {
      migrationsDir: 'src/migrations',
    },
  } as TypeOrmModuleOptions;
} else {
  ormconfig = {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE || false),
    migrationsRun: Boolean(process.env.TYPEORM_MIGRATIONS_RUN || false),
    logging: Boolean(process.env.TYPEORM_LOGGING || false),
    logger: 'file',
    keepConnectionAlive: false,
    entities: [`${__dirname}/**/**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    cli: {
      migrationsDir: 'src/migrations',
    },
  } as TypeOrmModuleOptions;
}

export = ormconfig;
