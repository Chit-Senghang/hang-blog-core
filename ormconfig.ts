import { DataSource } from 'typeorm';

const config = new DataSource({
  migrationsTableName: 'migrations_typeorm',
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  synchronize: false,
  migrations: [__dirname + '/**/database/migrations/*{.ts,.js}'],
  //   namingStrategy: new SnakeNamingStrategy(),
});

config.initialize();

export default config;
