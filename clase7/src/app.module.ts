import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { FirstMiddleware } from './middleware/firstMiddleware';

@Module({
  imports: [MongooseModule.forRoot("mongodb://javierveron:Javier123!@ac-plhhyyn-shard-00-00.d33hyf3.mongodb.net:27017,ac-plhhyyn-shard-00-01.d33hyf3.mongodb.net:27017,ac-plhhyyn-shard-00-02.d33hyf3.mongodb.net:27017/?ssl=true&replicaSet=atlas-mp4wj3-shard-0&authSource=admin&appName=CoderCluster"), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes({path:"*", method:RequestMethod.ALL})
  }
}
