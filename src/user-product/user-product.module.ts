import { Module , NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserProductService } from './user-product.service';
import { UserProductController } from './user-product.controller';
import { checkUserisExit } from './user-product.middleware';


@Module({
  controllers: [UserProductController],
  providers: [UserProductService],
})
export class UserProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkUserisExit)
      .forRoutes('cats');
  } 
}
