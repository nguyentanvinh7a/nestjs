import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from './playlist.entity';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(@Body() playlistDTO: CreatePlaylistDto): Promise<Playlist> {
    return this.playlistService.createPlaylist(playlistDTO);
  }
}
