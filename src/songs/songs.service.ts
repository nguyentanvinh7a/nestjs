import { Inject, Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';

@Injectable()
export class SongsService {
    private readonly songs: string[] = ['Despacito', 'Shape of You'];

    constructor(@Inject('CONNECTION') private connection: Connection) {
        console.log('CONNECTION', this.connection);
    }
    
    findAll(): string[] {
        // throw new Error('Could not get songs');
        return this.songs;
    }
    
    findOne(id: number): string {
        return this.songs[id];
    }
    
    create(song: CreateSongDto) {
        return this.songs.push(song.title);
    }
    
    update(id: number, song: string) {
        this.songs[id] = song;
    }
    
    remove(id: number) {
        this.songs.splice(id, 1);
    }
}
