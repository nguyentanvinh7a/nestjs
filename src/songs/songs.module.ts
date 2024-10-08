import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';

const mockSongsService = {
  findAll: () => ['test'],
};

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongsController],
  providers: [
    SongsService,
    // {
    //   provide: SongsService,
    //   useClass: SongsService,
    // },
    // {
    //   provide: SongsService,
    //   useValue: mockSongsService,
    // }
    {
      provide: 'CONNECTION',
      useValue: connection,
    }
  ],
})
export class SongsModule {}
