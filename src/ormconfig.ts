import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Check typeORM documentation for more information.
const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  keepConnectionAlive: true,
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
  migrationsRun: Boolean(process.env.TYPEORM_MIGRATIONS_RUN),
  logging: Boolean(process.env.TYPEORM_LOGGING),
  logger: 'file',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = config;
