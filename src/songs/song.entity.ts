import { Playlist } from "src/playlists/playlist.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('songs')
export class Song {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column('time')
    duration: Date;

    @Column('text')
    lyrics: string;

    // @ManyToMany(() => Artist, artist => artist.songs, { cascade: true })
    // @JoinTable(({ name: 'song_artists' }))
    // artists: Artist[];

    @ManyToOne(() => Playlist, playlist => playlist.songs)
    playlist: Playlist;
}