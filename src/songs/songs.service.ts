import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDto } from './dto/update-song-dto';

@Injectable()
export class SongsService {
  private readonly songs: string[] = ['Despacito', 'Shape of You'];

  constructor(
    @Inject('CONNECTION') private connection: Connection,
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {
    console.log('CONNECTION', this.connection);
  }

  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songsRepository.findOneBy({ id });
  }

  async create(songDTO: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releaseDate = songDTO.releaseDate;
    return await this.songsRepository.save(song);
  }

  update(id: number, songDTO: UpdateSongDto): Promise<UpdateResult> {
    return this.songsRepository.update(id, songDTO);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.songsRepository.delete(id);
  }
}
