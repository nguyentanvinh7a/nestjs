import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './songs/song.entity';
import { User } from './users/user.entity';
import { Playlist } from './playlists/playlist.entity';

const devConfig = { port: 3000 };
const prodConfig = { port: 400 };

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'spotify-clone',
      entities: [Song, User, Playlist],
      synchronize: true,
    }),
    SongsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useValue: process.env.NODE_ENV === 'production' ? prodConfig : devConfig,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // option 1: apply middleware to all routes
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes('*');

    // option 2: apply middleware to specific routes and methods
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({path: 'songs', method: RequestMethod.POST});

    // option 3: apply middleware to specific controller
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
