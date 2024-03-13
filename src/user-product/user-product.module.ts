import { Module , NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserProductService } from './user-product.service';
import { UserProductController } from './user-product.controller';
import { CheckUserIsExitMiddleware } from './user-product.middleware';


@Module({
  controllers: [UserProductController],
  providers: [UserProductService],
})
export class UserProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckUserIsExitMiddleware).forRoutes('user-product')
  } 
}
