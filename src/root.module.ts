import { Module } from '@nestjs/common';
import { UserProductModule } from './user-product/user-product.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'system',
      database: 'apple',
      entities: [__dirname + '/../**/*.entity.js'] ,
      synchronize: true,
    }),
    UserProductModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
