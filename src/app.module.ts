import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { User } from './graphql/models/User';
import { UserSetting } from './graphql/models/UserSettings';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

console.log(process.env.NODE_ENV);

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: process.env.NODE_ENV == 'TEST' ? 'test-db' : 'testdb1',
      entities: [User, UserSetting],
      synchronize: true,
      migrationsTransactionMode : 'each',
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
