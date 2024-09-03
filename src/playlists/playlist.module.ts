import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "./playlist.entity";
import { Song } from "src/songs/song.entity";
import { User } from "src/users/user.entity";
import { PlaylistService } from "./playlist.service";
import { PlaylistController } from "./playlist.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
    controllers: [PlaylistController],
    providers: [PlaylistService],
})
export class PlaylistModule {}