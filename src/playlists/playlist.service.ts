import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Song } from 'src/songs/song.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  async createPlaylist(playlistDTO: CreatePlaylistDto) {
    const playlist = new Playlist();
    playlist.name = playlistDTO.name;

    const songs = await this.songRepository.findBy({ id: playlistDTO.songs });
    playlist.songs = songs;

    const user = await this.userRepository.findOneBy({ id: playlistDTO.user });
    playlist.user = user;

    return this.playlistRepository.save(playlist);
  }
}
